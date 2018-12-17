import React from "react";
import Slider from "react-native-slider";
import { StyleSheet, View, Text, Switch, TouchableOpacity, Image, Animated, Easing, TouchableWithoutFeedback } from "react-native"; // importerar 
import { LinearGradient } from 'expo'; //ibland måste man specificera vart ifrån man importerar

export default class Componentfunction extends React.Component { 
    constructor(props) { //här lägger vi några states som vi senare kan ändra på
        super(props);
        this.Dark = new Animated.ValueXY({ x: 10000, y: 10000 })
        this.state = {
            lampname: "A", 
            cold: 100,
            hot: 100,
            knapp: false,
            power: false,
            fetch: 'http://iot.abbindustrigymnasium.se:3000/products/'
        }
    }

    Hot = () => { //dehär fyra properties ändrar states till de valda värdet
        this.setState({
            hot: 100,
        })
    }
    
    noHot = () => {
        this.setState({
            hot: 0,
        })
    }

    Cold1 = () => {
        this.setState({
            cold: 100,
        })
    }

    noCold1 = () => {
        this.setState({
            cold: 0,
        })
    }
  
    componentDidMount() { //detta körs när allt är inladdat
        let self = this; //vi kallar this för self för att lättare använda dock så använder vi ej det men jag skrev inte denna rad
        fetch('http://iot.abbindustrigymnasium.se:3000/products/', {  //urlen där vi vill skicka ifrån (detta är datorns ipadress, hämtas via ipconfig i cmd, ip4)
            method: 'GET'  //säger att det är get vi vill använda
        }).then((response) => response.json())  //gör om resultatet till json
        .then((responseJson) => {
            responseJson=responseJson[0];
            console.log(responseJson);  //skriver json data i consolen
            console.log(this.state);    //skriver vad som är i statevariabeln  
            console.log(responseJson.Cold);
            this.setState({cold: responseJson.Cold});
            console.log(responseJson.Hot);
            this.setState({hot: responseJson.Hot});
            console.log(responseJson.Power);
            this.setState({power: responseJson.Power});
            console.log(responseJson.SensorSetting);
            this.setState({knapp: responseJson.SensorSetting});
        }).catch((error) => {   //fångar error
            console.error(error);   //skriver error i consolen
        });
    console.log("Hasse");
    }

    UpdateDataToServer = () => {
        const { lampname }  = this.state ; //states
        const { cold }  = this.state ;
        const { hot }  = this.state ;
        const { knapp }  = this.state ;
        const { power }  = this.state ;
        var adress=this.state.fetch;
        console.log(cold); // skriver i konsolen värdet cold
        console.log(hot);

        const bodypart = JSON.stringify({ //bodypart är variabeln för de värderna
            Name: lampname,
            Cold: cold,
            Hot: hot,    
            SensorSetting: knapp,
            Power: power,
        }); //lägger in states till json package

        console.log(bodypart); //skriver ut hela json package
        fetch(adress, { //tar url där vi vill uppdatera värden adressen är ovan
            method: 'PATCH', //säger att det är patch vi vill använda
            headers: {
                'Accept': 'application/json', //accepterar bara jsonformat
                'Content-Type': 'application/json',
            },
            body: bodypart
        }).then((response) => response.json()) //gör resultatet till json
        .then((responseJson) => {
            console.log(responseJson); //skriver json i oconsolen
        }).catch((error) => { //fångar error
            console.error(error); //skriver error
        });  
    }

    _InfoAnimation = () => { //denna för den tillbaka
        Animated.timing(this.Dark, {
            toValue: { x: -1000, y: -1000 },
            duration: 0,
            esing: Easing.linear,
        }).start(() => {

        });
    }

    _InfoAnimationNo = () => { //animation som vi kan köra i return som i detta fall skickar vår view shadow till helvete och vidare 
            Animated.timing(this.Dark, {
                toValue: { x: 10000, y: 10000 },
                duration: 0,
                esing: Easing.linear,
        }).start(() => {

        });
    }

    render() {
    return (
        <LinearGradient colors={['#5b86e5', '#36D1DC']} style={styles.container}> {/* gradienten i bakgrunden */}

            <View style={styles.appleicons}/> {/* view som är placerad över iconerna som iphone har */}

            <View style={styles.flexdirection}> {/* ändrar direktionen av de kommande bilderna för att få de på rad istället för kolumn */}

                <TouchableOpacity onPress={this._InfoAnimation} style={styles.positiontest}> {/* gör bilden tryckbar och sätter igång animationen */}
                    <Image style={styles.icons} 
                        source={{uri:"https://i.imgur.com/CMimq9D.png"}}>
                    </Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenHowTo', {})} style={styles.positiontest}> {/* här har vi istället en navigation som ändrar skärm genom att göra komponenten osynlig/synlig */}
                    <Image style={styles.icons}
                        source={{uri:"https://i.imgur.com/WgNnO3R.png"}}>
                    </Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenLogin', {})} style={styles.positiontest}>
                    <Image style={styles.icons}
                        source={{uri:"https://i.imgur.com/q8yK9xy.png"}}> 
                    </Image>
                </TouchableOpacity>

                <Image style={styles.icons} 
                    opacity={0.35} 
                    source={{uri:"https://i.imgur.com/aMWWAck.png"}}>
                </Image> {/* man kan istället för att skriva i stylesheet skriva till tex opacity i returnen som vi gör här */}
                
            </View>
            

            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={{uri: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png"}}/>
                <Text style={styles.title}>En ljus ide</Text> 
            </View>


            <View style={styles.container}>

                <View style={styles.flexdirectionbutton}>

                    <Text style={styles.buttontext}>
                        Sensor:
                    </Text>

                    <Switch style={styles.button}
                        value={this.state.knapp}
                        onValueChange={(val) => {this.setState({ knapp: val }); this.UpdateDataToServer}}
                    /> {/* istället för en touchable opacity eller button så lägger vi till en switch som är default iphone eller android swichen man är bekant med */}

                    <Text style={styles.buttontext}>
                        Power:
                    </Text>

                    <Switch style={styles.button}
                        value={this.state.power}
                        onValueChange={(val) => {this.setState({ power: val }); this.UpdateDataToServer}}
                    />
                
                </View>

                <View
                    style={styles.flexdirectionslider}
                >

                    <TouchableOpacity onPress={this.noHot}>
                        <Image style={styles.iconssliderleft}
                            source={{uri:"https://i.imgur.com/a8yaSvW.png"}}>
                        </Image>
                    </TouchableOpacity>

                    <Slider style={styles.slider}
                        step={1}
                        maximumValue={100}
                        value={this.state.hot}
                        onValueChange={hot => this.setState({ hot })}
                        onSlidingComplete={ this.UpdateDataToServer}
                    /> {/* default slider istället för tex text input för att ändra värderna (hot) */}

                    <TouchableOpacity onPress={this.Hot}> {/* sätter hot till max */}
                        <Image style={styles.iconssliderright}
                            source={{uri:"https://i.imgur.com/a8yaSvW.png"}}>
                        </Image>
                    </TouchableOpacity>

                </View>

                <View style={styles.slidertextbackground}>
                    <Text style={styles.slidertext}> {/* i text kan man skriva en state som kan ändras och då visa de ändrade värderna */}
                        Varmt: {this.state.hot}%
                    </Text>
                </View>
        
                <View
                    style={styles.flexdirectionslider}
                >

                    <TouchableOpacity onPress={this.noCold1}>
                        <Image style={styles.iconssliderleft}
                            source={{uri:"https://i.imgur.com/GiOywnt.png"}}>
                        </Image>
                    </TouchableOpacity>

                    <Slider style={styles.slider}
                        step={1}
                        maximumValue={100}
                        value={this.state.cold}
                        onValueChange={cold => this.setState({ cold })}
                        onSlidingComplete={ this.UpdateDataToServer}
                    />

                    <TouchableOpacity onPress={this.Cold1}>
                        <Image style={styles.iconssliderright}
                            source={{uri:"https://i.imgur.com/GiOywnt.png"}}>
                       </Image>
                    </TouchableOpacity>

                </View>
             
                <View style={styles.slidertextbackground}>
                    <Text style={styles.slidertext}>
                        Kallt: {this.state.cold}%
                    </Text>
                </View>

                <TouchableWithoutFeedback onPress={this._InfoAnimationNo}> 
                    <Animated.View
                        style={[styles.shadow,
                        {opacity:this.opacity},
                        this.Dark.getLayout(),
                        ]}>
                    </Animated.View>
                </TouchableWithoutFeedback>{/* vi gör shadown till en stor knapp så du kan trycka överallt för att få bort den */}

            </View>

        </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({ //stylesheet är i princip css
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
    },
    slidertext: {
        fontSize: 15,
        justifyContent: "center",
        alignItems: "center",
        color: "rgba(255,255,255,0.9)"
    },
    slidertextbackground: {
        paddingHorizontal: 5,
    },
    slider: {
        width: 225,
    },
    button: {
        justifyContent: "center",
    },
    shadow: {
        backgroundColor: "rgba(0,0,0,0.65)",
        width: 5000,
        height: 5000,
        position: "absolute",
    },
    buttontext: {
        fontSize: 15,
        color: "rgba(255,255,255,0.9)"
    },
    appleicons: {
        backgroundColor: "rgba(0,0,0,0.1)",
        paddingVertical: 11,
    },
    icons: {
        height: 35,
        width: 35,
        marginHorizontal: 10,
    },
    iconssliderright: {
        height: 30,
        width: 30,
        marginHorizontal: 5,
    },
    iconssliderleft: {
        height: 18,
        width: 18,
        marginHorizontal: 5,
    },

    flexdirection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 10,
    },
    flexdirectionslider: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    flexdirectionbutton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    logoContainer: {
        alignItems: "center",
        flexGrow: 0.75,
    },  
    logo: {
        width: 150,
        height: 150,
    },
    title: {
        color: "#ffffff",
        marginTop: 10,
        width: 110,
        textAlign: "center",
        opacity: 0.9,
    },
/*
    positiontest: {
        backgroundColor: "#ffffff"
    },
*/
});