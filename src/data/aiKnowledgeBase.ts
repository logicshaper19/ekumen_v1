export const knowledgeBase = {
  parcel: {
    soilHealth: {
      ph: {
        optimal: { min: 6.0, max: 7.5 },
        recommendations: {
          low: [
            "Ajouter de la chaux pour augmenter le pH",
            "Utiliser des amendements calcaires",
            "Surveiller régulièrement les niveaux de pH"
          ],
          high: [
            "Ajouter du soufre pour diminuer le pH",
            "Utiliser des engrais acidifiants",
            "Incorporer de la matière organique"
          ]
        }
      },
      organicMatter: {
        optimal: { min: 3, max: 5 },
        recommendations: [
          "Pratiquer la rotation des cultures",
          "Incorporer des cultures de couverture",
          "Appliquer du compost ou du fumier"
        ]
      }
    },
    irrigation: {
      systems: {
        goutte_a_goutte: {
          efficiency: 0.9,
          advantages: [
            "Économie d'eau",
            "Distribution précise",
            "Réduction des maladies foliaires"
          ],
          maintenance: [
            "Vérifier les filtres mensuellement",
            "Inspecter les goutteurs",
            "Nettoyer le système annuellement"
          ]
        },
        aspersion: {
          efficiency: 0.75,
          advantages: [
            "Couverture uniforme",
            "Installation simple",
            "Adapté aux grandes surfaces"
          ],
          maintenance: [
            "Vérifier la pression",
            "Nettoyer les buses",
            "Ajuster la distribution"
          ]
        }
      }
    }
  },
  crop: {
    management: {
      fertilization: {
        principles: [
          "Analyser le sol avant l'application",
          "Fractionner les apports",
          "Respecter les périodes d'application"
        ],
        methods: [
          "Application au sol",
          "Fertigation",
          "Pulvérisation foliaire"
        ]
      },
      pestControl: {
        integrated: [
          "Surveillance régulière",
          "Utilisation de prédateurs naturels",
          "Rotation des cultures",
          "Seuils d'intervention"
        ],
        biological: [
          "Utilisation d'auxiliaires",
          "Pièges à phéromones",
          "Produits biologiques"
        ]
      }
    },
    marketTrends: {
      analysis: [
        "Évolution des prix",
        "Demande du marché",
        "Exigences qualité",
        "Circuits de distribution"
      ],
      strategies: [
        "Diversification des cultures",
        "Certification qualité",
        "Stockage stratégique",
        "Contrats de production"
      ]
    }
  },
  transformation: {
    practices: {
      sustainable: [
        "Agriculture de conservation",
        "Agroforesterie",
        "Agriculture biologique",
        "Agriculture de précision"
      ],
      implementation: {
        steps: [
          "Diagnostic initial",
          "Plan d'action",
          "Formation",
          "Suivi et évaluation"
        ],
        challenges: [
          "Investissement initial",
          "Adaptation technique",
          "Période de transition",
          "Formation du personnel"
        ]
      }
    },
    impacts: {
      evaluation: {
        environmental: [
          "Biodiversité",
          "Qualité du sol",
          "Ressources en eau",
          "Émissions GES"
        ],
        economic: [
          "Coûts de production",
          "Rendements",
          "Valeur ajoutée",
          "Accès au marché"
        ],
        social: [
          "Conditions de travail",
          "Emploi local",
          "Transfert de compétences",
          "Acceptabilité sociale"
        ]
      }
    }
  },
  regulatory: {
    compliance: {
      documentation: [
        "Registre parcellaire",
        "Cahier de fertilisation",
        "Registre phytosanitaire",
        "Plan de fumure"
      ],
      certifications: {
        bio: {
          requirements: [
            "Période de conversion",
            "Absence de produits chimiques",
            "Traçabilité",
            "Plan de gestion"
          ],
          steps: [
            "Notification",
            "Engagement",
            "Contrôle",
            "Certification"
          ]
        },
        hve: {
          requirements: [
            "Biodiversité",
            "Stratégie phytosanitaire",
            "Gestion de la fertilisation",
            "Irrigation"
          ],
          levels: [
            "Niveau 1: Réglementation environnementale",
            "Niveau 2: Adoption de bonnes pratiques",
            "Niveau 3: Haute performance environnementale"
          ]
        }
      }
    }
  }
};
