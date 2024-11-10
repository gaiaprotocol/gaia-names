import { SupabaseDataRepository } from "@common-module/supabase";
import GaiaNameEntity, { GaiaNameQuery } from "../entities/GaiaNameEntity.js";

class GaiaNameRepository extends SupabaseDataRepository<GaiaNameEntity> {
  constructor() {
    super("gaia_names", GaiaNameQuery);
  }

  public async fetchName(walletAddress: string): Promise<string | undefined> {
    const data = await this.fetchSingle((b) =>
      b.eq("wallet_address", walletAddress)
    );
    return data?.name;
  }

  public async searchNames(query: string): Promise<GaiaNameEntity[]> {
    return this.fetch((b) => b.ilike("name", `%${query}%`));
  }
}

export default new GaiaNameRepository();
