@RestResource(urlMapping='/agent/chat')
global class OilGas_AgentEndpoint {

    @HttpPost
    global static void handleMessage() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        res.addHeader('Content-Type', 'application/json');

        Map<String, Object> body = (Map<String, Object>) JSON.deserializeUntyped(req.requestBody.toString());
        String message = (String) body.get('message');

        if (String.isBlank(message)) {
            res.statusCode = 400;
            res.responseBody = Blob.valueOf('{"error":"message is required"}');
            return;
        }

        String reply = routeAndRespond(message.toLowerCase());
        res.statusCode = 200;
        res.responseBody = Blob.valueOf(JSON.serialize(new Map<String, String>{ 'reply' => reply }));
    }

    private static String routeAndRespond(String msg) {
        if (msg.contains('pricing') || msg.contains('price') || msg.contains('margin') || msg.contains('cost monitor') || msg.contains('guardian')) {
            OilGas_PricingIntelligence.Request r = new OilGas_PricingIntelligence.Request();
            r.vertical = 'downstream';
            return OilGas_PricingIntelligence.execute(new List<OilGas_PricingIntelligence.Request>{r})[0].pricing_summary;
        }
        if (msg.contains('logistics') || msg.contains('delivery') || msg.contains('stockout') || msg.contains('route') || msg.contains('fleet')) {
            OilGas_LogisticsIntelligence.Request r = new OilGas_LogisticsIntelligence.Request();
            r.vertical = 'downstream';
            return OilGas_LogisticsIntelligence.execute(new List<OilGas_LogisticsIntelligence.Request>{r})[0].logistics_summary;
        }
        if (msg.contains('upstream') || msg.contains('offshore') || msg.contains('fpso') || msg.contains('well') || msg.contains('platform') || msg.contains('production') || msg.contains('pre-salt') || msg.contains('pre salt')) {
            OilGas_UpstreamOperations.Request r = new OilGas_UpstreamOperations.Request();
            r.operation_type = 'general';
            return OilGas_UpstreamOperations.execute(new List<OilGas_UpstreamOperations.Request>{r})[0].operations_summary;
        }
        if (msg.contains('midstream') || msg.contains('pipeline') || msg.contains('terminal') || msg.contains('gas') || msg.contains('lng')) {
            OilGas_MidstreamOperations.Request r = new OilGas_MidstreamOperations.Request();
            r.segment = 'general';
            return OilGas_MidstreamOperations.execute(new List<OilGas_MidstreamOperations.Request>{r})[0].midstream_summary;
        }
        if (msg.contains('agentforce') || msg.contains('autonomous') || msg.contains('guardrail')) {
            OilGas_AgentforceDetails.Request r = new OilGas_AgentforceDetails.Request();
            r.topic = 'overview';
            return OilGas_AgentforceDetails.execute(new List<OilGas_AgentforceDetails.Request>{r})[0].agentforce_info;
        }
        if (msg.contains('market') || msg.contains('brazil') || msg.contains('anp') || msg.contains('regulation') || msg.contains('opportunity')) {
            OilGas_MarketIntelligence.Request r = new OilGas_MarketIntelligence.Request();
            r.market_segment = 'overview';
            return OilGas_MarketIntelligence.execute(new List<OilGas_MarketIntelligence.Request>{r})[0].market_summary;
        }
        return 'I\'m your Oil & Gas Brazil advisor powered by Agentforce. I can help with:\n\n' +
               '- Downstream: pricing agents, logistics, dealer management\n' +
               '- Upstream: offshore ops, pre-salt, compliance, workforce\n' +
               '- Midstream: pipelines, terminals, trading\n' +
               '- Agentforce: how autonomous agents work in O&G\n' +
               '- Market context: Brazil opportunity sizing\n\n' +
               'What would you like to know more about?';
    }
}
