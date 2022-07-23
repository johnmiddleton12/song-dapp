import {JsonRpcProvider, JsonRpcFetchFunc, ExternalProvider, Networkish } from "@ethersproject/providers";
import { logger } from "ethers";

export class Web3Provider extends JsonRpcProvider {
    readonly provider: ExternalProvider;
    readonly jsonRpcFetchFunc: JsonRpcFetchFunc;

    constructor(provider: ExternalProvider | JsonRpcFetchFunc, network?: Networkish) {
        if (provider == null) {
            logger.throwArgumentError("missing provider", "provider", provider);
        }

        let path: string = null;
        let jsonRpcFetchFunc: JsonRpcFetchFunc = null;
        let subprovider: ExternalProvider = null;

        if (typeof(provider) === "function") {
            path = "unknown:";
            jsonRpcFetchFunc = provider;

        } else {
            path = provider.host || provider.path || "";
            if (!path && provider.isMetaMask) {
                path = "metamask";
            }

            subprovider = provider;

            if (provider.request) {
                if (path === "") { path = "eip-1193:"; }
                jsonRpcFetchFunc = buildEip1193Fetcher(provider);
            } else if (provider.sendAsync) {
                jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.sendAsync.bind(provider));
            } else if (provider.send) {
                jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.send.bind(provider));
            } else {
                logger.throwArgumentError("unsupported provider", "provider", provider);
            }

            if (!path) { path = "unknown:"; }
        }

        super(path, network);

        defineReadOnly(this, "jsonRpcFetchFunc", jsonRpcFetchFunc);
        defineReadOnly(this, "provider", subprovider);
    }

    send(method: string, params: Array<any>): Promise<any> {
        return this.jsonRpcFetchFunc(method, params);
    }
}