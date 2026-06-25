public with sharing class OilGas_IntelligentContext {

    public class Request {
        @InvocableVariable(required=false description='The ID of the record the user is currently viewing')
        public String recordId;
    }

    public class Response {
        @InvocableVariable(description='User role: AE, SE, Manager, or Unknown')
        public String user_role;
        @InvocableVariable(description='Industry vertical detected from context: downstream, upstream, midstream, or unknown')
        public String detected_vertical;
        @InvocableVariable(description='Account name if user is on an Account or related record')
        public String account_name;
        @InvocableVariable(description='Account industry classification')
        public String account_industry;
        @InvocableVariable(description='Opportunity stage if user is on an Opportunity')
        public String opportunity_stage;
        @InvocableVariable(description='Contextual summary for the agent to use')
        public String context_summary;
    }

    @InvocableMethod(label='Get Intelligent Context' description='Retrieves user role and record context for personalized agent responses')
    public static List<Response> execute(List<Request> requests) {
        List<Response> responses = new List<Response>();

        User currentUser = [SELECT Id, UserRole.Name, Profile.Name, Title
                           FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];

        for (Request req : requests) {
            Response res = new Response();

            res.user_role = detectRole(currentUser);
            res.detected_vertical = 'unknown';
            res.account_name = '';
            res.account_industry = '';
            res.opportunity_stage = '';

            if (String.isNotBlank(req.recordId)) {
                populateRecordContext(req.recordId, res);
            }

            res.context_summary = buildSummary(res);
            responses.add(res);
        }
        return responses;
    }

    private static String detectRole(User u) {
        String roleName = u.UserRole != null ? u.UserRole.Name.toLowerCase() : '';
        String title = u.Title != null ? u.Title.toLowerCase() : '';
        String profileName = u.Profile != null ? u.Profile.Name.toLowerCase() : '';

        if (roleName.contains('account executive') || title.contains('account executive') || title.contains('ae')) {
            return 'AE';
        } else if (roleName.contains('solution engineer') || title.contains('solution engineer') || title.contains('se ') || title.contains('presales')) {
            return 'SE';
        } else if (roleName.contains('manager') || title.contains('manager') || title.contains('director')) {
            return 'Manager';
        }
        return 'Unknown';
    }

    private static void populateRecordContext(String recordId, Response res) {
        Id rid = Id.valueOf(recordId);
        String sobjectType = rid.getSObjectType().getDescribe().getName();

        if (sobjectType == 'Account') {
            List<Account> accts = [SELECT Name, Industry, Description
                                   FROM Account WHERE Id = :rid LIMIT 1];
            if (!accts.isEmpty()) {
                res.account_name = accts[0].Name;
                res.account_industry = accts[0].Industry != null ? accts[0].Industry : '';
                res.detected_vertical = detectVerticalFromAccount(accts[0]);
            }
        } else if (sobjectType == 'Opportunity') {
            List<Opportunity> opps = [SELECT Name, StageName, Account.Name, Account.Industry, Account.Description
                                      FROM Opportunity WHERE Id = :rid LIMIT 1];
            if (!opps.isEmpty()) {
                res.opportunity_stage = opps[0].StageName;
                res.account_name = opps[0].Account != null ? opps[0].Account.Name : '';
                res.account_industry = opps[0].Account != null && opps[0].Account.Industry != null ? opps[0].Account.Industry : '';
                if (opps[0].Account != null) {
                    res.detected_vertical = detectVerticalFromAccount(opps[0].Account);
                }
            }
        }
    }

    private static String detectVerticalFromAccount(SObject acct) {
        String name = ((String) acct.get('Name')).toLowerCase();
        String industry = acct.get('Industry') != null ? ((String) acct.get('Industry')).toLowerCase() : '';
        String description = acct.get('Description') != null ? ((String) acct.get('Description')).toLowerCase() : '';
        String combined = name + ' ' + industry + ' ' + description;

        if (combined.contains('distributor') || combined.contains('fuel') || combined.contains('station')
            || combined.contains('downstream') || combined.contains('retail') || combined.contains('posto')) {
            return 'downstream';
        } else if (combined.contains('e&p') || combined.contains('exploration') || combined.contains('offshore')
            || combined.contains('upstream') || combined.contains('pre-salt') || combined.contains('fpso')) {
            return 'upstream';
        } else if (combined.contains('pipeline') || combined.contains('terminal') || combined.contains('midstream')
            || combined.contains('lng') || combined.contains('transpetro') || combined.contains('regasification')) {
            return 'midstream';
        }

        if (industry.contains('oil') || industry.contains('gas') || industry.contains('energy')) {
            return 'downstream';
        }
        return 'unknown';
    }

    private static String buildSummary(Response res) {
        List<String> parts = new List<String>();

        parts.add('User Role: ' + res.user_role);

        if (String.isNotBlank(res.account_name)) {
            parts.add('Account: ' + res.account_name);
        }
        if (String.isNotBlank(res.account_industry)) {
            parts.add('Industry: ' + res.account_industry);
        }
        if (String.isNotBlank(res.opportunity_stage)) {
            parts.add('Opportunity Stage: ' + res.opportunity_stage);
        }
        if (res.detected_vertical != 'unknown') {
            parts.add('Detected Vertical: ' + res.detected_vertical);
        }

        return String.join(parts, ' | ');
    }
}
