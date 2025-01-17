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
## Expo routing
Met behulp van `expo routing` wordt file-based routing toegepast, wat het mogelijk maakt om een duidelijke en eenvoudige navigatie voor een platform te ontwikkelen. Zoals te zien is binnen de `app`-map, zie je deze lay-out:

```
├── app/
│   ├── modal/
│   │   ├── filter.tsx
│   │   ├── location-search.tsx
│   ├── _layout.tsx
│   └── index.tsx
```

In de `_layout.tsx` kun je de opmaak bepalen door gebruik te maken van `Stack.Screen` om schermen te stapelen. Op deze manier krijgt het scherm ook de native functionaliteiten. Bijvoorbeeld, IOS zorgt automatisch voor micro-animaties en zowel Android als IOS krijgen de app-beleving die je verwacht. Je kunt aan deze `Stack.Screen` een `Presentation` eigenschap mee geven. Door hier bijvoorbeeld `Modal` te plaatsen, krijg je in plaats van een gestapelde scherm een annematie te zien dat deze pagina over de huidige pagina komt. Een `Modal` komt veel voor bij IOS maar niet veel bij Android. Hier is een voorbeeld van hoe je dit kunt implementeren:

```typescript
//voorbeeld filter modal
<Stack.Screen name="(modal)/filter"
        options={{
          presentation: 'modal',
          headerTitle: 'Filter',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.lightgrey,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => {navigationRef.goBack()}}>
              <Ionicons name='close-outline' size={30} color={Colors.primary} />
            </TouchableOpacity>
            
          ),
        }}
        />
```

Je kunt de eigenschappen van de `Stack.Screen` aanpassen. Dit geldt overigens niet alleen voor de `Stack.Screen`, maar ook als je bijvoorbeeld een modal toevoegt.

https://github.com/Zhantie/test-app-expo-typescript/assets/74553048/606c2e9d-3536-49a5-9f84-4cd167f425ea

## Code Snippets component

### Restaurants Component

De `Restaurants.tsx`-component in de `/components`-map verzorgt de weergave voor beschikbare restaurants in de app. Hier is een voorbeeld van de de restaurant geimplementeerd heb:

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
      {restaurants.map((restaurant, index) => (      //haal de restaurants op in een Json data bestand. 
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

Om styles toe te voegen kun je doormiddel van het importeren van ```StyleSheet``` van react native. Hier een voorbeeld hoe de ```StyleSheet``` eruit kan zien.
De reden voor deze `StyleSheet` is om ervoor te zorgen dat all styles die je mee geeft op een gezamelijke plaats terecht komen om de overzicht en de overdraagbaarheid van je code te behouden.

```typescript
const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 250,
    backgroundColor: "white",
    marginEnd: 16,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    borderRadius: 4,
  },
  categoryText: {
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  // rest van de styleSheet
});
```
https://github.com/Zhantie/test-app-expo-typescript/assets/74553048/d92978e9-c765-4b10-8228-291b0791a33b

## Oproepen API
In Expo weet ik nu hoe ik API kan oproepen. In dit voorbeeld heb ik te maken gehad met een kaart. De kaart is gemakkelijk verkrijgbaar vanuit Google zelf. Google heeft verschillende data die je kunt ophalen, waardoor je de geselecteerde data vanuit één token gegenereerd kunt krijgen. Vanuit Google heb ik de `Geocoding API` en `Places API` gebruikt voor deze POC. Voor nu heb ik de API token eruit gehaald. De kaart werk nog wel alleen het vinden van locaties niet. De reden hiervoor is omdat ik momenteel geen billing account heb bij Google. Als afbeelding heb ik toegevoegd hoe de `Places API` in zijn werking zou gaan als dit in mijn app toepgepast zou worden.

![Places API](https://github.com/Zhantie/test-app-expo-typescript/assets/74553048/49b62c9e-9960-4431-aa84-ca2a5b75bebb)

## Google places API & Geocoding API
Door middel van de package `react-native-google-places-autocomplete` word gekeken wanneer een gebruikers zoekt naar een locatie, en zijn of haar locatie gevoonden is, wordt de locatie weergeven door de `latitude` en `longitude` die opgehaald worden vanuit de `Geocoding API` 
```typescript
// ophalen locatie lat & long van de gebruiker
onPress={(data, details = null) => {
          const point = details?.geometry?.location;
          if (!point) return;
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
```

https://github.com/Zhantie/test-app-expo-typescript/assets/74553048/3145c75e-d35f-4072-bf7c-33ad897912cd

## Hoe te gebruiken met Expo
1. **Clonen van het project**: Clone dit repository naar je lokale machine.
2. **Installatie van Expo CLI**: Indien je nog geen Expo CLI geïnstalleerd hebt, voer dan `npm install -g expo-cli` uit om Expo CLI te installeren.
3. **Installatie van dependencies**: Voer `npm install` uit in de hoofdmap van het project om alle benodigde afhankelijkheden te installeren.
4. **Starten van de Expo-server**: Gebruik `expo start` om de Expo-server te starten.
5. **Openen van de app op een emulator of fysiek apparaat**:

---
