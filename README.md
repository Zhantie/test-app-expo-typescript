# FastfoodApp met Expo

Deze app functioneert als een food delivery platform vergelijkbaar met Deliveroo. Gebruikers kunnen door de kaart bladeren, producten aan een lijst toevoegen en verwijderen, enzovoort.

## Doel

Na het uitvoeren van literatuuronderzoek wilde ik mijn kennis in development verdiepen om een beter inzicht te krijgen in de werkwijze binnen technieken bij Freshheads. Deze app diende als een leerproject om vertrouwd te raken met de ontwikkelingstool Expo en de programmeertaal TypeScript. Het ontwikkelen van een functionele food delivery app bood een praktische context om verschillende aspecten van app-ontwikkeling te verkennen.

## Folderstructuur

De app is gestructureerd volgens de onderstaande mappenindeling:

```
fastfoodApp/
├── app/
│   ├── modal/
│   │   ├── filter.tsx
│   │   ├── location-search.tsx
│   │   └── _layout.tsx
│   ├── index.tsx
│
├── assets/
│   ├── data/
│   ├── fonts/
│   └── images/
│
├── components/
│   ├── BottomSheet.tsx
│   ├── Categories.tsx
│   ├── CustomHeader.tsx
│   ├── MySafeAreaView.tsx
│   └── Restaurants.tsx
│
├── constants/
│   └── Colors.ts
│
├── .env
├── .gitignore
├── app.json
├── babel.config.js
├── metro.config.js
├── package-lock.json
├── package.json
└── tsconfig.json
```

## Code Snippets

### Voorbeeld 1: BottomSheet Component

De `BottomSheet.tsx`-component in de `/components`-map verzorgt de weergave van het bottom sheet element in de app. Hier is een voorbeeld van de implementatie:

```typescript
// Restaurants.tsx
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { restaurants } from "@/assets/data/home";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

const Restaurants = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      {restaurants.map((restaurant, index) => (
        <Link href={"/"} key={index} asChild>
          <TouchableOpacity>
            <View style={styles.categoryCard}>
              <Image style={styles.image} source={restaurant.img} />
              <View style={styles.categoryBox}>
                <Text style={styles.categoryText}>{restaurant.name}</Text>
                <Text style={{color: Colors.green}}>{restaurant.rating} {restaurant.ratings}</Text>
                <Text style={{color: Colors.medium}}>{restaurant.distance}</Text>
                
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

export default BottomSheet;
```

*Voeg soortgelijke uitleg toe voor andere belangrijke code snippets die je wilt benadrukken.*

## Hoe te gebruiken met Expo

1. **Clonen van het project**: Clone dit repository naar je lokale machine.
2. **Installatie van Expo CLI**: Indien je nog geen Expo CLI geïnstalleerd hebt, voer dan `npm install -g expo-cli` uit om Expo CLI te installeren.
3. **Installatie van dependencies**: Voer `npm install` uit in de hoofdmap van het project om alle benodigde afhankelijkheden te installeren.
4. **Starten van de Expo-server**: Gebruik `expo start` om de Expo-server te starten.
5. **Openen van de app op een emulator of fysiek apparaat**:

---
