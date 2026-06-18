// Deklarasi tipe minimal untuk `midtrans-client` (paket tidak menyertakan .d.ts).
// Hanya bagian yang dipakai project ini.
declare module "midtrans-client" {
  interface SnapConfig {
    isProduction: boolean;
    serverKey: string;
    clientKey?: string;
  }

  interface TransactionParams {
    transaction_details: { order_id: string; gross_amount: number };
    item_details?: Array<{ id: string; name: string; price: number; quantity: number }>;
    customer_details?: Record<string, unknown>;
    [key: string]: unknown;
  }

  interface SnapTransaction {
    token: string;
    redirect_url: string;
  }

  class Snap {
    constructor(config: SnapConfig);
    createTransaction(params: TransactionParams): Promise<SnapTransaction>;
  }

  class CoreApi {
    constructor(config: SnapConfig);
  }

  const _default: { Snap: typeof Snap; CoreApi: typeof CoreApi };
  export default _default;
}
