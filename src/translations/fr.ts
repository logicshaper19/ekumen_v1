export const translations = {
  // Navigation
  navigation: {
    dashboard: "Tableau de bord",
    inbox: "Messagerie",
    workBench: "Espace de travail",
    businessPlan: "Plan d'exploitation",
    transition: "Transition",
    myData: "Mes données",
    backTo: "Retour à"
  },

  // Dashboard
  dashboard: {
    welcome: "Bienvenue",
    latestNews: "Dernières actualités",
    newTools: "Nouveaux outils",
    marketTrends: "Tendances du marché",
    regulatoryUpdates: "Mises à jour réglementaires",
    performanceBenchmark: "Analyse comparative",
    howYouMeasureUp: "Voici comment vous vous comparez à vos pairs",
    viewDetailedAnalysis: "Voir l'analyse détaillée",
    yourStrengths: "Vos points forts",
    improvementOpportunities: "Opportunités d'amélioration",
    notifications: "Notifications",
    viewAll: "Voir tout",

    // Strengths
    strengths: {
      precisionAgriculture: {
        title: "Agriculture de précision",
        description: "Équipement guidé par GPS et application à taux variable",
        comparison: "Meilleur que 85% des agriculteurs"
      },
      soilHealth: {
        title: "Gestion de la santé des sols",
        description: "Tests réguliers et amélioration de la matière organique",
        comparison: "Meilleur que 72% des agriculteurs"
      },
      waterManagement: {
        title: "Gestion de l'eau",
        description: "Irrigation intelligente avec capteurs d'humidité",
        comparison: "Meilleur que 78% des agriculteurs"
      },
      cropRotation: {
        title: "Rotation des cultures",
        description: "Rotation diversifiée avec cultures de couverture",
        comparison: "Meilleur que 65% des agriculteurs"
      },
      dataManagement: {
        title: "Gestion des données",
        description: "Tenue de registres numériques et analyses",
        comparison: "Meilleur que 92% des agriculteurs"
      }
    },

    // Improvement Opportunities
    improvements: {
      renewableEnergy: {
        title: "Énergie renouvelable",
        description: "Panneaux solaires pour les opérations agricoles",
        impact: "Les agriculteurs ont amélioré leur score GES de 18%"
      },
      biodiversityZones: {
        title: "Zones de biodiversité",
        description: "Corridors dédiés à la faune",
        impact: "Score de biodiversité augmenté de 25%"
      },
      carbonCredits: {
        title: "Crédits carbone",
        description: "Participation aux marchés du carbone",
        impact: "Revenu supplémentaire de 120€/ha/an"
      },
      agroforestry: {
        title: "Agroforesterie",
        description: "Intégration des arbres dans l'agriculture",
        impact: "Qualité du sol améliorée de 32%"
      },
      biogasProduction: {
        title: "Production de biogaz",
        description: "Énergie à partir des déchets organiques",
        impact: "Coûts énergétiques réduits de 45%"
      }
    },

    // Notifications
    alerts: {
      maintenance: {
        title: "Entretien du tracteur",
        status: "Dans 5 jours",
        description: "Maintenance annuelle requise",
        action: "Planifier l'entretien"
      },
      sales: {
        title: "Livraison de blé",
        status: "Dans 2 semaines",
        description: "150 tonnes en attente de livraison",
        action: "Voir les détails du contrat"
      },
      audit: {
        title: "Audit coopératif",
        date: "25 mars 2024",
        description: "Évaluation annuelle",
        action: "Préparer la documentation"
      }
    }
  },

  // Business Plan
  businessPlan: {
    kpiEvolution: "Évolution des KPI de l'exploitation",
    selectParcels: "Sélectionnez des parcelles pour voir les métriques détaillées ou les tendances globales",
    metrics: {
      revenue: "Chiffre d'affaires",
      semiNetMargin: "Marge semi-nette",
      ghgEmissions: "Émissions GES",
      energyConsumption: "Consommation d'énergie",
      workingHours: "Heures de travail",
      biodiversityScore: "Score biodiversité",
      soilQualityScore: "Score qualité du sol",
      nh3Emissions: "Émissions NH₃",
      nitrogenLeaching: "Lessivage d'azote"
    }
  },

  // Work Bench (Planning)
  workBench: {
    title: "Espace de travail",
    description: "Visualiser et gérer les plans de transformation agricole",
    cropList: {
      description: "Gérer les cultures et les rotations"
    },
    regulatoryList: {
      description: "Suivre les exigences réglementaires et la conformité"
    },
    addTask: "Ajouter une tâche",
    metrics: {
      totalParcels: "Total parcelles",
      activeArea: "Surface active",
      pendingTasks: "Tâches en attente",
      urgentTasks: "Tâches urgentes"
    },
    tabs: {
      parcels: "Parcelles",
      crops: "Cultures",
      tasks: "Tâches",
      regulatory: "Réglementaire"
    },
    parcelList: {
      title: "Parcelles agricoles",
      description: "Suivre et gérer les parcelles individuelles"
    },
    taskList: {
      title: "Liste des tâches",
      addTask: "Ajouter une tâche",
      filterTasks: "Filtrer les tâches",
      priority: {
        all: "Toutes",
        high: "Haute",
        medium: "Moyenne",
        low: "Basse"
      },
      status: {
        completed: "Terminée",
        inProgress: "En cours",
        pending: "En attente"
      },
      actions: {
        start: "Démarrer",
        pause: "Pause",
        complete: "Terminer",
        edit: "Modifier",
        details: "Détails"
      }
    }
  },

  // Workbench
  workbench: {
    title: "Espace de travail",
    overview: "Aperçu",
    tasks: "Tâches",
    currentCrop: "Culture actuelle",
    soilMoisture: "Humidité du sol",
    temperature: "Température",
    lastYield: "Dernier rendement",
    assistant: {
      title: "Assistant agricole",
      message: "Je peux vous aider à optimiser votre parcelle. Posez-moi des questions sur la santé du sol, les besoins en irrigation ou les recommandations de culture basées sur les conditions actuelles."
    },
    soil: {
      data: "Données du sol",
      type: "Type",
      ph: "pH",
      organicMatter: "Matière organique",
      lastTested: "Dernier test"
    },
    irrigation: {
      title: "Irrigation",
      system: "Système",
      schedule: "Programme",
      lastMaintenance: "Dernier entretien"
    }
  },

  // My Data
  myData: {
    title: "Mes données",
    connectedStorage: "Stockage connecté",
    uploadStorage: "Connecter le stockage",
    tabs: {
      myDocs: "Mes documents",
      shared: "Documents partagés",
      audit: "Rapports d'audit"
    },
    description: {
      myDocs: "Vos documents et registres agricoles privés",
      shared: "Documents partagés avec les partenaires et conseillers",
      audit: "Rapports officiels et documents de conformité"
    }
  },

  // Transition
  transition: {
    title: "Plans de transformation",
    description: "Gérer et suivre la transformation de votre exploitation",
    selectPlan: "Sélectionnez un plan de transformation pour voir les détails ou en créer un nouveau",
    tabs: {
      ongoing: "En cours",
      review: "En révision",
      consideration: "À l'étude"
    },
    sections: {
      ongoingTitle: "Transformations en cours",
      ongoingDescription: "Plans de transformation actifs en cours d'implémentation",
      reviewTitle: "En révision",
      reviewDescription: "Plans en cours de révision ou en attente d'approbation",
      considerationTitle: "À l'étude",
      considerationDescription: "Plans de transformation potentiels à évaluer",
      status: "Statut actuel",
      impact: "Impact prévu",
      lastUpdate: "Dernière mise à jour"
    }
  },

  // Inbox
  inbox: {
    title: "Messagerie",
    compose: "Composer",
    addContact: "Ajouter un contact",
    search: "Rechercher des messages...",
    messageItem: "Élément de message",
    unread: "Non lu",
    read: "Lu",
    sentDate: "Date d'envoi",
    urgent: "Urgent",
    messageContent: "Contenu du message",
    organization: "Organisation",
    noMessages: "Aucun message"
  },

  // Contact Details
  contact: {
    information: "Informations de contact",
    communicationHistory: "Historique des communications",
    lastContact: "Dernier contact",
    messages: "Messages",
    partnerSince: "Partenaire depuis",
    documents: "Documents",
    recentDocuments: "Documents récents",
    status: {
      new: "nouveau",
      inactive: "inactif",
      active: "actif"
    },
    total: "total",
    shared: "partagés"
  },

  // Common
  common: {
    actions: {
      view: "Voir les détails",
      edit: "Modifier",
      start: "Démarrer",
      pause: "Pause",
      complete: "Terminer",
      delete: "Supprimer",
      save: "Enregistrer",
      cancel: "Annuler",
      confirm: "Confirmer",
      back: "Retour",
      next: "Suivant",
      finish: "Terminer"
    },
    status: {
      active: "Actif",
      inactive: "Inactif",
      pending: "Statut",
      approved: "Approuvé",
      rejected: "Rejeté",
      inProgress: "En cours",
      completed: "Terminé"
    },
    units: {
      hectares: "ha",
      tonnes: "t",
      days: "jours",
      hours: "h"
    }
  }
};