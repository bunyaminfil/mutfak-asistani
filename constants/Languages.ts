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
            market: "Shopping List",
            notifications: "Notifications",
        },
        market: {
            title: "Shopping List",
            itemName: "Item name",
            quantity: "Quantity",
            clearList: "Clear List",
            addItem: "Add Item"
        },
        notifications: {
            title: "Notifications",
            meal: "Meal",
            market: "Shopping",
            general: "General",
            add: "Add Notification",
            mealTitle: "Meal Time",
            mealBody: "Time to prepare your meal!",
            marketTitle: "Shopping Time",
            marketBody: "Don't forget to check your shopping list!",
            generalTitle: "Reminder",
            generalBody: "You have a notification!",
            deleteTitle: "Delete Notification",
            deleteMessage: "Are you sure you want to delete this notification?",
            delete: "Delete",
            cancel: "Cancel",
        }
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
            market: "Alışveriş Listesi",
            notifications: "Bildirimler",
        },
        market: {
            title: "Alışveriş Listesi",
            itemName: "Ürün adı",
            quantity: "Miktar",
            clearList: "Listeyi Temizle",
            addItem: "Ürün Ekle"
        },
        notifications: {
            title: "Bildirimler",
            meal: "Yemek",
            market: "Alışveriş",
            general: "Genel",
            add: "Bildirim Ekle",
            mealTitle: "Yemek Vakti",
            mealBody: "Yemeğinizi hazırlama vakti!",
            marketTitle: "Alışveriş Vakti",
            marketBody: "Alışveriş listenizi kontrol etmeyi unutmayın!",
            generalTitle: "Hatırlatma",
            generalBody: "Bir bildiriminiz var!",
            deleteTitle: "Bildirim Sil",
            deleteMessage: "Bu bildirimi silmek istediğinize emin misiniz?",
            delete: "Sil",
            cancel: "İptal",
        }
    },
};

export type Language = keyof typeof Languages;
