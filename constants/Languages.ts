export const Languages = {
    en: {
        languages: {
            language: "Languages",
            en: "English",
            tr: "Turkish",
        },
        home: {
            featuredCategories: "Featured Categories",
            allCategories: "All Categories",
        },
        favorites: {
            title: "Favorites",
            emptyMessage: "No favorite meals yet. Start adding some!",
        },
        meal: {
            ingredients: "Ingredients",
            instructions: "Instructions",
            recipes: "Recipes",
        },
        drawer: {
            home: "Home",
            favorites: "Favorites",
            profile: "Profile",
        },
    },
    tr: {
        languages: {
            language: "Diller",
            en: "İngilizce",
            tr: "Türkçe",
        },
        home: {
            featuredCategories: "Öne Çıkan Kategoriler",
            allCategories: "Tüm Kategoriler",
        },
        favorites: {
            title: "Favoriler",
            emptyMessage: "Henüz favori yemek yok. Favori eklemeye başla!",
        },
        meal: {
            ingredients: "Malzemeler",
            instructions: "Hazırlanışı",
            recipes: "Tarifler",
        },
        drawer: {
            home: "Ana Sayfa",
            favorites: "Favoriler",
            profile: "Profil",
        },
    },
};

export type Language = keyof typeof Languages;
