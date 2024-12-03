export interface YearlyKPI {
  year: number;
  revenue: number;
  semiNetMargin: number;
  ghgEmissions: number;
  energyConsumption: number;
  workingHours: number;
  biodiversity: number;
  soilQuality: number;
  nh3Emissions: number;
  nitrogenLeaching: number;
}

export interface Parcel {
  id: string;
  name: string;
  area: number;
  kpiData: YearlyKPI[];
}

export const farmKpiData: YearlyKPI[] = [
  {
    year: 2021,
    revenue: 850000,
    semiNetMargin: 32,
    ghgEmissions: 4.2,
    energyConsumption: 2.8,
    workingHours: 45,
    biodiversity: 2.5,
    soilQuality: 2.8,
    nh3Emissions: 25,
    nitrogenLeaching: 30
  },
  {
    year: 2022,
    revenue: 920000,
    semiNetMargin: 35,
    ghgEmissions: 3.8,
    energyConsumption: 2.5,
    workingHours: 42,
    biodiversity: 2.8,
    soilQuality: 3.0,
    nh3Emissions: 22,
    nitrogenLeaching: 28
  },
  {
    year: 2023,
    revenue: 980000,
    semiNetMargin: 37,
    ghgEmissions: 3.5,
    energyConsumption: 2.3,
    workingHours: 40,
    biodiversity: 3.2,
    soilQuality: 3.3,
    nh3Emissions: 20,
    nitrogenLeaching: 25
  },
  {
    year: 2024,
    revenue: 1050000,
    semiNetMargin: 39,
    ghgEmissions: 3.2,
    energyConsumption: 2.1,
    workingHours: 38,
    biodiversity: 3.5,
    soilQuality: 3.5,
    nh3Emissions: 18,
    nitrogenLeaching: 22
  }
];

export const parcels: Parcel[] = [
  {
    id: "p1",
    name: "North Field",
    area: 25,
    kpiData: [
      {
        year: 2021,
        revenue: 250000,
        semiNetMargin: 30,
        ghgEmissions: 4.0,
        energyConsumption: 2.6,
        workingHours: 43,
        biodiversity: 2.3,
        soilQuality: 2.6,
        nh3Emissions: 24,
        nitrogenLeaching: 28
      },
      {
        year: 2022,
        revenue: 280000,
        semiNetMargin: 33,
        ghgEmissions: 3.6,
        energyConsumption: 2.4,
        workingHours: 40,
        biodiversity: 2.6,
        soilQuality: 2.8,
        nh3Emissions: 21,
        nitrogenLeaching: 26
      },
      {
        year: 2023,
        revenue: 300000,
        semiNetMargin: 35,
        ghgEmissions: 3.3,
        energyConsumption: 2.2,
        workingHours: 38,
        biodiversity: 3.0,
        soilQuality: 3.1,
        nh3Emissions: 19,
        nitrogenLeaching: 24
      },
      {
        year: 2024,
        revenue: 320000,
        semiNetMargin: 37,
        ghgEmissions: 3.0,
        energyConsumption: 2.0,
        workingHours: 36,
        biodiversity: 3.3,
        soilQuality: 3.3,
        nh3Emissions: 17,
        nitrogenLeaching: 21
      }
    ]
  },
  {
    id: "p2",
    name: "South Field",
    area: 30,
    kpiData: [
      {
        year: 2021,
        revenue: 300000,
        semiNetMargin: 33,
        ghgEmissions: 4.3,
        energyConsumption: 2.9,
        workingHours: 46,
        biodiversity: 2.6,
        soilQuality: 2.9,
        nh3Emissions: 26,
        nitrogenLeaching: 31
      },
      {
        year: 2022,
        revenue: 320000,
        semiNetMargin: 36,
        ghgEmissions: 3.9,
        energyConsumption: 2.6,
        workingHours: 43,
        biodiversity: 2.9,
        soilQuality: 3.1,
        nh3Emissions: 23,
        nitrogenLeaching: 29
      },
      {
        year: 2023,
        revenue: 340000,
        semiNetMargin: 38,
        ghgEmissions: 3.6,
        energyConsumption: 2.4,
        workingHours: 41,
        biodiversity: 3.3,
        soilQuality: 3.4,
        nh3Emissions: 21,
        nitrogenLeaching: 26
      },
      {
        year: 2024,
        revenue: 360000,
        semiNetMargin: 40,
        ghgEmissions: 3.3,
        energyConsumption: 2.2,
        workingHours: 39,
        biodiversity: 3.6,
        soilQuality: 3.6,
        nh3Emissions: 19,
        nitrogenLeaching: 23
      }
    ]
  }
];