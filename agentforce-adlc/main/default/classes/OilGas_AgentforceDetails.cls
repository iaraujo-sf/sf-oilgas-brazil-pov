public with sharing class OilGas_AgentforceDetails {

    public class Request {
        @InvocableVariable(required=true description='Specific Agentforce topic to explain (overview, architecture, guardrails, scenarios)')
        public String topic;
    }

    public class Response {
        @InvocableVariable(description='Detailed Agentforce explanation')
        public String agentforce_info;
    }

    @InvocableMethod(label='Get Agentforce Details' description='Retrieves detailed Agentforce architecture information and Oil & Gas specific scenarios')
    public static List<Response> execute(List<Request> requests) {
        List<Response> responses = new List<Response>();
        for (Request req : requests) {
            Response res = new Response();
            res.agentforce_info = 'Agentforce for Oil & Gas: Platform enables autonomous agents with Trigger→Reasoning→Action→Guardrails pattern. In O&G Brazil: 16 agents across 3 verticals operating 24/7. Key differentiator: agents use real CRM data (not hallucinated), operate within business guardrails, maintain full audit trail, and escalate to humans for exceptions. Atlas Reasoning Engine powers decision-making. Average response: minutes vs days for manual processes.';
            responses.add(res);
        }
        return responses;
    }
}
