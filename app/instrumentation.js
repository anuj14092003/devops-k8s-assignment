const { NodeSDK } = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");

const traceExporter = new OTLPTraceExporter({
    url: "http://otel-collector.observability.svc.cluster.local:4318/v1/traces"
});

const sdk = new NodeSDK({
    traceExporter,
    instrumentations: [
        getNodeAutoInstrumentations()
    ]
});

sdk.start();

process.on("SIGTERM", () => {
    sdk.shutdown()
        .then(() => console.log("OpenTelemetry SDK shut down successfully"))
        .catch((error) => console.error("Error shutting down OpenTelemetry SDK", error))
        .finally(() => process.exit(0));
});