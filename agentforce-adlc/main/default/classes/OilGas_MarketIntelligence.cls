public with sharing class OilGas_MarketIntelligence {

    public class Request {
        @InvocableVariable(required=true description='Market segment to query (upstream, midstream, downstream, overview)')
        public String market_segment;
    }

    public class Response {
        @InvocableVariable(description='Market intelligence summary')
        public String market_summary;
    }

    @InvocableMethod(label='Get Market Intelligence' description='Retrieves Brazilian Oil & Gas market data including size, regulation, and competitive landscape')
    public static List<Response> execute(List<Request> requests) {
        List<Response> responses = new List<Response>();
        for (Request req : requests) {
            Response res = new Response();
            res.market_summary = 'Brazil O&G market: R$700B+ downstream (42K stations, Top 5 control 70%), upstream dominated by Petrobras pre-salt (84 E&P groups, 3.5M bbl/day), midstream ~7,500km pipelines. Regulation: ANP (full chain), IBAMA (environmental), ANTT (transport). Salesforce TAM: $2-5M/distributor, $3-8M/E&P operator, $1.5-4M/midstream. No strong CRM competitor in O&G-specific workflows. SAP dominant in ERP but weak in customer engagement.';
            responses.add(res);
        }
        return responses;
    }
}
