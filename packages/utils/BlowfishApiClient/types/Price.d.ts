import type { PriceSource } from "./PriceSource";
export interface Price {
    source: PriceSource;
    last_updated_at: number;
    dollar_value_per_token: number | null;
}
//# sourceMappingURL=Price.d.ts.map