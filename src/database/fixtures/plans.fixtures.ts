import { PlanFeaturesInterface } from '../../interfaces/plan.interface';
import dataSource from '../../data-source';
import { PlanEntity } from '../../entities/plan.entity';
import { Repository } from 'typeorm';

interface PlanFixture {
  name: string;
  slug: string;
  description: string;
  priceMonthlyCents: number;
  priceYearlyCents: number;
  features: PlanFeaturesInterface;
  isActive: boolean;
}

const plansFixtures: PlanFixture[] = [
  {
    name: 'Starter (Gratuito)',
    slug: 'starter_free',
    description: 'Para tatuadores independentes iniciando a jornada.',
    priceMonthlyCents: 0,
    priceYearlyCents: 0,
    isActive: true,
    features: {
      max_users: 1,
      max_storage_mb: 500,
      has_financial: false,
      has_inventory: true,
      has_whatsapp: false,
      custom_domain: false,
    },
  },
  {
    name: 'Studio Pro',
    slug: 'studio_pro',
    description: 'Gestão completa para estúdios em crescimento.',
    priceMonthlyCents: 8990, // R$ 89,90
    priceYearlyCents: 89900, // R$ 899,00
    isActive: true,
    features: {
      max_users: 5,
      max_storage_mb: 5000, // 5 GB
      has_financial: true,
      has_inventory: true,
      has_whatsapp: true,
      custom_domain: false,
    },
  },
  {
    name: 'Empire (Ilimitado)',
    slug: 'empire_unlimited',
    description: 'Poder total para grandes estúdios e franquias.',
    priceMonthlyCents: 19990,
    priceYearlyCents: 199900,
    isActive: true,
    features: {
      max_users: -1, // Ilimitado
      max_storage_mb: 50000, // 50 GB
      has_financial: true,
      has_inventory: true,
      has_whatsapp: true,
      custom_domain: true, // Futuramente será usado
    },
  },
];

export const run = async () => {
  if (!dataSource.isInitialized) await dataSource.initialize();
  const planRepo: Repository<PlanEntity> = dataSource.getRepository(PlanEntity);

  for (const plan of plansFixtures) {
    const existingPlan = await planRepo.findOneBy({ slug: plan.slug });

    if (!existingPlan) {
      const newPlan = planRepo.create({
        name: plan.name,
        slug: plan.slug,
        description: plan.description,
        priceMonthlyCents: plan.priceMonthlyCents,
        priceYearlyCents: plan.priceYearlyCents,
        features: JSON.stringify(plan.features),
        isActive: plan.isActive,
      });

      await planRepo.save(newPlan);
      console.log(`Plano "${plan.name}" criado com sucesso.`);
    } else {
      const needsUpdate =
        existingPlan.priceMonthlyCents !== plan.priceMonthlyCents ||
        existingPlan.priceYearlyCents !== plan.priceYearlyCents || // ADICIONADO
        JSON.stringify(existingPlan.features) !== JSON.stringify(plan.features);

      if (needsUpdate) {
        existingPlan.name = plan.name;
        existingPlan.description = plan.description;
        existingPlan.priceMonthlyCents = plan.priceMonthlyCents;
        existingPlan.priceYearlyCents = plan.priceYearlyCents;
        existingPlan.features = JSON.stringify(plan.features);
        existingPlan.isActive = plan.isActive;

        await planRepo.save(existingPlan);
        console.log(`🔄 Plano ATUALIZADO: ${plan.name}`);
      }
    }
  }
};

void run();
