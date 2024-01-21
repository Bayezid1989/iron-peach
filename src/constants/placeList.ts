import type { AppPlaceConfig } from '$types';

export const ASSET_PLACES: Record<string, AppPlaceConfig> = {
	amsterdam: {
		coordinates: {
			lat: 52.377956,
			lng: 4.89707
		},
		role: 'asset',
		assets: [
			{
				id: 'amsterdamCanalCruiseCompany',
				price: 300,
				profitRate: 0.1
			},
			{
				id: 'amsterdamDiamondPolishingWorkshop',
				price: 500,
				profitRate: 0.15
			},
			{
				id: 'amsterdamTulipsFarm',
				price: 200,
				profitRate: 0.08
			},
			{
				id: 'amsterdamWindmillEnergyCooperative',
				price: 400,
				profitRate: 0.12
			},
			{
				id: 'amsterdamChocolateFactory',
				price: 600,
				profitRate: 0.2
			}
		]
	},
	paris: {
		coordinates: {
			lat: 48.864716,
			lng: 2.349014
		},
		role: 'asset',
		assets: [
			{
				id: 'parisEiffelTowerViewingPlatformConcessions',
				price: 700,
				profitRate: 0.25
			},
			{
				id: 'parisLuxuryFashionBoutique',
				price: 800,
				profitRate: 0.3
			},
			{
				id: 'parisCroissantBakeryChain',
				price: 450,
				profitRate: 0.18
			},
			{
				id: 'parisPerfumeManufacturer',
				price: 650,
				profitRate: 0.22
			},
			{
				id: 'parisArtGalleryDistrictRentals',
				price: 350,
				profitRate: 0.12
			}
		]
	},
	rome: {
		coordinates: {
			lat: 41.902782,
			lng: 12.496366
		},
		role: 'asset',
		assets: [
			{
				id: 'romeGelatoStandChain',
				price: 200,
				profitRate: 0.08
			},
			{
				id: 'romeColosseumSouvenirShop',
				price: 450,
				profitRate: 0.18
			},
			{
				id: 'romeLuxuryLeatherGoodsWorkshop',
				price: 600,
				profitRate: 0.22
			},
			{
				id: 'romeWineVineyardEstate',
				price: 500,
				profitRate: 0.16
			},
			{
				id: 'romePastaFactory',
				price: 300,
				profitRate: 0.12
			}
		]
	},
	berlin: {
		coordinates: {
			lat: 52.520008,
			lng: 13.404954
		},
		role: 'asset',
		assets: [
			{
				id: 'berlinCraftBeerBrewery',
				price: 250,
				profitRate: 0.1
			},
			{
				id: 'berlinTechStartupIncubator',
				price: 400,
				profitRate: 0.15
			},
			{
				id: 'berlinHistoricalTourBusiness',
				price: 300,
				profitRate: 0.12
			},
			{
				id: 'berlinChocolateBarChain',
				price: 550,
				profitRate: 0.2
			},
			{
				id: 'berlinSolarPanelInstallationCompany',
				price: 350,
				profitRate: 0.14
			}
		]
	},
	london: {
		coordinates: {
			lat: 51.509865,
			lng: -0.118092
		},
		role: 'asset',
		assets: [
			{
				id: 'londonDoubleDeckerBusAdvertisingContract',
				price: 500,
				profitRate: 0.2
			},
			{
				id: 'londonTeaShopChain',
				price: 300,
				profitRate: 0.12
			},
			{
				id: 'londonFishAndChipsRestaurant',
				price: 400,
				profitRate: 0.15
			},
			{
				id: 'londonFootballClubMerchandiseStand',
				price: 700,
				profitRate: 0.25
			},
			{
				id: 'londonSavileRowTailoringShop',
				price: 600,
				profitRate: 0.22
			}
		]
	},
	barcelona: {
		coordinates: {
			lat: 41.390205,
			lng: 2.154007
		},
		role: 'asset',
		assets: [
			{
				id: 'barcelonaTapasBarChain',
				price: 300,
				profitRate: 0.12
			},
			{
				id: 'barcelonaSoccerClubMerchandiseStand',
				price: 600,
				profitRate: 0.22
			},
			{
				id: 'barcelonaModernistArchitectureTourBusiness',
				price: 400,
				profitRate: 0.15
			},
			{
				id: 'barcelonaPaellaRestaurant',
				price: 500,
				profitRate: 0.18
			},
			{
				id: 'barcelonaCatalanWineVineyardEstate',
				price: 700,
				profitRate: 0.25
			}
		]
	},
	copenhagen: {
		coordinates: {
			lat: 55.676098,
			lng: 12.568337
		},
		role: 'asset',
		assets: [
			{
				id: 'copenhagenLegoBrickDesignStudio',
				price: 400,
				profitRate: 0.16
			},
			{
				id: 'copenhagenSustainableEnergyConsultingFirm',
				price: 350,
				profitRate: 0.14
			},
			{
				id: 'copenhagenMichelin-starredRestaurant',
				price: 750,
				profitRate: 0.27
			},
			{
				id: 'copenhagenWindmillEnergyCooperative',
				price: 400,
				profitRate: 0.12
			},
			{
				id: 'copenhagenVikingHistoryMuseumGiftShop',
				price: 300,
				profitRate: 0.12
			}
		]
	},
	lisbon: {
		coordinates: {
			lat: 38.736946,
			lng: -9.142685
		},
		role: 'asset',
		assets: [
			{
				id: 'lisbonTramcarNetworkAdvertisingRights',
				price: 400,
				profitRate: 0.16
			},
			{
				id: 'lisbonCannedSardineFactory',
				price: 300,
				profitRate: 0.12
			},
			{
				id: 'lisbonCorkProductsWorkshop',
				price: 400,
				profitRate: 0.15
			},
			{
				id: 'lisbonCustardTartBakeryChain',
				price: 600,
				profitRate: 0.22
			},
			{
				id: 'lisbonTileFactory',
				price: 450,
				profitRate: 0.18
			}
		]
	},
	dublin: {
		coordinates: {
			lat: 53.35014,
			lng: -6.266155
		},
		role: 'asset',
		assets: [
			{
				id: 'dublinIrishPubChain',
				price: 300,
				profitRate: 0.12
			},
			{
				id: 'dublinWhiskeyDistillery',
				price: 500,
				profitRate: 0.18
			},
			{
				id: 'dublinLeprechaunSouvenirShop',
				price: 400,
				profitRate: 0.15
			},
			{
				id: 'dublinIrishWoolProductsWorkshop',
				price: 600,
				profitRate: 0.22
			},
			{
				id: 'dublinGuinnessBreweryTourConcession',
				price: 600,
				profitRate: 0.22
			}
		]
	},
	edinburgh: {
		coordinates: {
			lat: 55.953251,
			lng: -3.188267
		},
		role: 'asset',
		assets: [
			{
				id: 'edinburghWhiskeyDistillery',
				price: 500,
				profitRate: 0.18
			},
			{
				id: 'edinburghScottishWoolProductsWorkshop',
				price: 600,
				profitRate: 0.22
			},
			{
				id: 'edinburghEdinburghCastleSouvenirShop',
				price: 400,
				profitRate: 0.16
			},
			{
				id: 'edinburghGhostTourAgency',
				price: 200,
				profitRate: 0.08
			},
			{
				id: 'edinburghShortbreadBakeryChain',
				price: 400,
				profitRate: 0.15
			}
		]
	},
	stockholm: {
		coordinates: {
			lat: 59.329323,
			lng: 18.068581
		},
		role: 'asset',
		assets: [
			{
				id: 'stockholmFurnitureDesignStudio',
				price: 400,
				profitRate: 0.15
			},
			{
				id: 'stockholmNobelPrizeMuseumGiftShop',
				price: 300,
				profitRate: 0.12
			},
			{
				id: 'stockholmSwedishMeatballRestaurant',
				price: 500,
				profitRate: 0.18
			},
			{
				id: 'stockholmVikingHistoryMuseumGiftShop',
				price: 300,
				profitRate: 0.12
			},
			{
				id: 'stockholmIceHotel',
				price: 600,
				profitRate: 0.22
			}
		]
	},
	istanbul: {
		coordinates: {
			lat: 41.008238,
			lng: 28.978359
		},
		role: 'asset',
		assets: [
			{
				id: 'istanbulTurkishCoffeeShopChain',
				price: 300,
				profitRate: 0.12
			},
			{
				id: 'istanbulBaklavaBakeryChain',
				price: 400,
				profitRate: 0.15
			},
			{
				id: 'istanbulTurkishDelightFactory',
				price: 500,
				profitRate: 0.18
			},
			{
				id: 'istanbulTurkishBathhouse',
				price: 600,
				profitRate: 0.22
			},
			{
				id: 'istanbulBosphorusCruiseCompany',
				price: 700,
				profitRate: 0.25
			}
		]
	},
	athens: {
		coordinates: {
			lat: 37.98381,
			lng: 23.727539
		},
		role: 'asset',
		assets: [
			{
				id: 'athensSouvlakiShop',
				price: 200,
				profitRate: 0.08
			},
			{
				id: 'athensOliveOilFactory',
				price: 300,
				profitRate: 0.12
			},
			{
				id: 'athensFetaCheeseFactory',
				price: 400,
				profitRate: 0.15
			},
			{
				id: 'athensAncientRuinsTourBusiness',
				price: 500,
				profitRate: 0.18
			},
			{
				id: 'athensGreekYogurtFactory',
				price: 600,
				profitRate: 0.22
			}
		]
	},
	monaco: {
		coordinates: {
			lat: 43.738418,
			lng: 7.424616
		},
		role: 'asset',
		assets: [
			{
				id: 'monacoCasino',
				price: 1000,
				profitRate: 0.35
			},
			{
				id: 'monacoYachtRentalCompany',
				price: 800,
				profitRate: 0.3
			},
			{
				id: 'monacoLuxuryCarDealership',
				price: 700,
				profitRate: 0.25
			},
			{
				id: 'monacoLuxuryFashionBoutique',
				price: 800,
				profitRate: 0.3
			},
			{
				id: 'monacoLuxuryHotelChain',
				price: 900,
				profitRate: 0.35
			}
		]
	},
	lucerne: {
		coordinates: {
			lat: 47.050168,
			lng: 8.309307
		},
		role: 'asset',
		assets: [
			{
				id: 'lucerneChocolateShop',
				price: 300,
				profitRate: 0.12
			},
			{
				id: 'lucerneSwissWatchWorkshop',
				price: 400,
				profitRate: 0.15
			},
			{
				id: 'lucerneSwissArmyKnifeWorkshop',
				price: 500,
				profitRate: 0.18
			},
			{
				id: 'lucerneSwissCheeseFactory',
				price: 600,
				profitRate: 0.22
			},
			{
				id: 'lucerneSwissChocolateFactory',
				price: 700,
				profitRate: 0.25
			}
		]
	},
	bruges: {
		coordinates: {
			lat: 51.209348,
			lng: 3.2247
		},
		role: 'asset',
		assets: [
			{
				id: 'brugesChocolateShop',
				price: 300,
				profitRate: 0.12
			},
			{
				id: 'brugesBeerBrewery',
				price: 400,
				profitRate: 0.15
			},
			{
				id: 'brugesLaceWorkshop',
				price: 500,
				profitRate: 0.18
			},
			{
				id: 'brugesWaffleStandChain',
				price: 600,
				profitRate: 0.22
			},
			{
				id: 'brugesFriesStandChain',
				price: 700,
				profitRate: 0.25
			}
		]
	}
};

export const INCOME_EXPENSE_PLACES: Record<string, AppPlaceConfig> = {
	zaragoza: {
		coordinates: {
			lat: 41.648823,
			lng: -0.889085
		},
		role: 'income',
		cashVolume: 'low'
	},
	montpellier: {
		coordinates: {
			lat: 43.610769,
			lng: 3.876716
		},
		role: 'income',
		cashVolume: 'low'
	},
	burgos: {
		coordinates: {
			lat: 42.343479,
			lng: -3.696906
		},
		role: 'income',
		cashVolume: 'low'
	},
	toulouse: {
		coordinates: {
			lat: 43.604652,
			lng: 1.444209
		},
		role: 'income',
		cashVolume: 'low'
	},
	sanSebastian: {
		coordinates: {
			lat: 43.318334,
			lng: -1.981231
		},
		role: 'expense',
		cashVolume: 'medium'
	},
	pau: {
		coordinates: {
			lat: 43.296482,
			lng: -0.370089
		},
		role: 'income',
		cashVolume: 'low'
	},
	bordeaux: {
		coordinates: {
			lat: 44.837789,
			lng: -0.57918
		},
		role: 'expense',
		cashVolume: 'medium'
	},
	nantes: {
		coordinates: {
			lat: 47.218371,
			lng: -1.553621
		},
		role: 'income',
		cashVolume: 'medium'
	},
	lyon: {
		coordinates: {
			lat: 45.764043,
			lng: 4.835659
		},
		role: 'expense',
		cashVolume: 'medium'
	},
	porto: {
		coordinates: {
			lat: 41.157944,
			lng: -8.629105
		},
		role: 'income',
		cashVolume: 'low'
	},
	sevilla: {
		coordinates: {
			lat: 37.389092,
			lng: -5.984459
		},
		role: 'expense',
		cashVolume: 'medium'
	},
	gibraltar: {
		coordinates: {
			lat: 36.140751,
			lng: -5.353585
		},
		role: 'income',
		cashVolume: 'low'
	},
	granada: {
		coordinates: {
			lat: 37.177336,
			lng: -3.598557
		},
		role: 'expense',
		cashVolume: 'medium'
	}
};

export const ITEM_PLACES: Record<string, AppPlaceConfig> = {
	madrid: {
		coordinates: {
			lat: 40.416775,
			lng: -3.70379
		},
		role: 'item',
		items: ['doubleDice', 'trippleDice']
	},
	geneva: {
		coordinates: {
			lat: 46.204391,
			lng: 6.143158
		},
		role: 'item',
		items: ['doubleDice', 'trippleDice']
	},
	liverpool: {
		coordinates: {
			lat: 53.408371,
			lng: -2.991573
		},
		role: 'item',
		items: ['doubleDice', 'trippleDice']
	}
};

export const ALL_PLACES = {
	...ASSET_PLACES,
	...INCOME_EXPENSE_PLACES,
	...ITEM_PLACES
};
