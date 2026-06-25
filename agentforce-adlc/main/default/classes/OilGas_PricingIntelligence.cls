public with sharing class OilGas_PricingIntelligence {

    public class Request {
        @InvocableVariable(required=true description='The vertical to query pricing data for')
        public String vertical;
    }

    public class Response {
        @InvocableVariable(description='Current pricing context and market movements')
        public String pricing_summary;
    }

    @InvocableMethod(label='Get Pricing Intelligence' description='Retrieves current pricing intelligence and market data for downstream fuel distribution')
    public static List<Response> execute(List<Request> requests) {
        List<Response> responses = new List<Response>();
        for (Request req : requests) {
            Response res = new Response();
            res.pricing_summary = 'Downstream pricing context: Petrobras gate price stable at R$3.25/L (gasoline A). BRL/USD at 5.45 (-0.3% today). Biofuel blend mandate at 27% ethanol. Key agents: Cost Monitor tracking 3 price signals, Deal Margin Guardian processing ~150 deals/day with 82% auto-approval rate, Competitive Response detected 2 regional undercuts this week in SP interior.';
            responses.add(res);
        }
        return responses;
    }
}
