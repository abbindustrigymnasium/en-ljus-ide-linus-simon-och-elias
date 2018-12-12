import React from "react";
import Slider from "react-native-slider";
import { AppRegistry, StyleSheet, View, Text, Switch, TouchableOpacity, Image, Animated, Easing, TouchableWithoutFeedback } from "react-native";
import { LinearGradient, Constants } from 'expo';

export default class Componentfunction extends React.Component {
    constructor(props) {
        super(props);
        this.Dark = new Animated.ValueXY({ x: 10000, y: 10000 })
        this.state = {
            lampname: "A", 
            cold: 100,
            hot: 100,
            knapp: false,
            power: false,
            fetch: 'http://iot.abbindustrigymnasium.se:3001/products/'
        }
    }

    Hot = () => {
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
  
    componentDidMount() { //Körs när allt är inladdat
        let self = this; //Kallar this för self för att lättare använda
          fetch(this.state.fetch+this.state.lampname, {  //Urlen där vi vill skicka ifrån (Detta är datorns ipadress, hämtas via ipconfig i cmd, ip4)
            method: 'GET'  //Säger att det är GET vi vill använda
          }).then((response) => response.json())  //Gör om resultatet till json
          .then((responseJson) => {
              console.log(responseJson);
    //      //Om response.message är Getter
    //              alert( responseJson.strength);
    //              var strength= responseJson.strength/100;
    //    self.setState( //Sätter värden till statevariablen
    //      {
             
    //           //TAr första produkten i listans namn
    //           value: strength
    //  }
    // )
                
                           console.log(this.state); //För att se vad som är i statevariabeln
                 
              
          }).catch((error) => { //Fångar error
            console.error(error);
          });
      }

      UpdateDataToServer = () =>{ //Liknande insert men patch istället för Port
     
     
        const { lampname }  = this.state ;
        const { cold }  = this.state ;
        const { hot }  = this.state ;
        const { knapp }  = this.state ;
        const { power }  = this.state ;

        var adress=this.state.fetch;
    //    var cold=(value);
    //    var hot=(value);
       console.log(cold);
       console.log(hot);

       const bodypart = JSON.stringify({
            Name: lampname,
            Cold: cold,
            Hot: hot,    
            SensorSetting: knapp,
            Power: power,
       });

       console.log(bodypart);
       fetch(adress, {
         method: 'PATCH',   
           headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           },
         body: bodypart
        
       }).then((response) => response.json())
           .then((responseJson) => {

       // Showing response message coming from server after inserting records.
  
       console.log(responseJson);
        //alert( "Update was successfull, "+ lampname); //Skriver ut att uppdateringen lyckats samt itemet som uppdaterats, vi använder namn denna gång för responseJSon säger ingenting om vad som uppdaterats
        
           }).catch((error) => {
           console.error(error);
           });
        
           
         }
    _InfoAnimation = () => {
        Animated.timing(this.Dark, {
            toValue: { x: -1000, y: -1000 },
            duration: 0,
            esing: Easing.linear,
        }).start(() => {
        //    Animated.timing(this.state.opacity, {
        //        toValue: 0.75,
        //        duration: 500,
        //        useNativeDriver: true,
        //}).start(() => {

        });
        //})
    }

    _InfoAnimationNo = () => {
        //Animated.timing(this.state.opacity, {
        //    toValue: 0,
        //    duration: 500,
        //    useNativeDriver: true,
        //}).start(() => {
            Animated.timing(this.Dark, {
                toValue: { x: 10000, y: 10000 },
                duration: 0,
                esing: Easing.linear,
        }).start(() => {

        });
        //})
    }

    render() {

    //if (!this.props.visible) {
     //return false; 
  //}
    return (
        <LinearGradient colors={['#5b86e5', '#36D1DC']} style={styles.container}>

            <View style={styles.appleicons}/>

            <View style={styles.flexdirection}>

                <TouchableOpacity onPress={this._InfoAnimation} style={styles.positiontest}>
                    <Image style={styles.icons}
                        source={{uri:"https://i.imgur.com/CMimq9D.png"}}>
                    </Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenHowTo', {})} style={styles.positiontest}>
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
                </Image>
                
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
                    />

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
  //colors={['transparent', '#F2994A']}
  //start={{ x: 0, y: 1 }}
  //end={{ x: 1, y: 1 }}
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
                    />

                    <TouchableOpacity onPress={this.Hot}>
                        <Image style={styles.iconssliderright}
                            source={{uri:"https://i.imgur.com/a8yaSvW.png"}}>
                        </Image>
                    </TouchableOpacity>

                </View>

                <View style={styles.slidertextbackground}>
                <Text style={styles.slidertext}> 
                    Varmt: {this.state.hot}%
                </Text>
                </View>
        
                <View
  style={styles.flexdirectionslider}
  //colors={['transparent', '#a8c0ff']}
  //start={{ x: 0, y: 1 }}
  //end={{ x: 1, y: 1 }}
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
                </TouchableWithoutFeedback>

            </View>

        </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
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
      //transform: [{ rotate: '90deg'}],
  },

  slidertextbackground: {
    //backgroundColor: "rgba(255,255,255,0.15)"
    paddingHorizontal: 5,
  },

  slider: {
    width: 225, //undvik 123
  },

  button: {
      justifyContent: "center",
      
  },
  shadow: { //gör det transparent någonstans idk kom på något
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
    //backgroundColor: "rgba(255,255,255,0.15)",
},
flexdirectionbutton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    //backgroundColor: "rgba(255,255,255,0.15)",
    //borderTopWidth: 1,
    //borderLeftWidth: 1,
    //borderRightWidth: 1,
    //borderTopRightRadius: 25,
    //borderTopLeftRadius: 25,
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

positiontest: {
    backgroundColor: "#ffffff"
},

});
/*import React from "react";
import Slider from "react-native-slider";
import { AppRegistry, StyleSheet, View, Text, Switch } from "react-native";
import { LinearGradient, Constants } from 'expo';

export default class Componentfunction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Name: "1", 
            valueCold: 100,
            valueHot: 100, 
            fetch:'http://iot.abbindustrigymnasium.se:3001/products/' 
        }
    }
  
  componentDidMount() { //körs när allt är inladdat
        let self = this; // kallar this för self för att lättare använda
         fetch(this.state.fetch+this.state.lampname, { //urlen där vi vill skicka ifrån (detta är datorns ipadress,hämtas via ipconfig i cmd, ipv4)
              method: 'GET' // säger att det är get vi vill använda 
        }).then((response) => response.json()) // gör om resultaten till json
        .then((responseJson) => {
            //console.log(responseJson);
            //om response.message är getter
                    alert( responseJson.strength);
                    var strength= responseJson.strength/100;
        self.setState( // Sätter värden till startvärden
            {
                
                // tar första produkten i listans namn
                value: strength
            }
        )
        
             console.log(this.state); // för att se vad som är i startvariabeln 
      
    }).catch((error) => { // fångar error
        console.error(error);
    });
  }

    UpdateDataToServer = () =>{ // liknande insert men patch istället för port

        const { lampname } = this.state ;
        const { valueCold } = this.state ;
        const { valueHot } = this.state ;

        console.log(this.state.valueCold);

        var adress=this.state.fetch;
        var Strength =(valueCold*10);

        jsonbody= JSON.stringify({
            Name: 1,
                  Strength: Strength

            });

        console.log(jsonbody);
        fetch(adress, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
            },
           body: jsonbody
        
        }).then((response) => response.json())
            .then((responseJson) => {

                // showing response message coming from server after inserting records.

                console.log(responseJson);
                //alert( 'update was successfull, '+ lampname); // skriver ut att uppdateringen samt itemet som har uppdaterats, 
                // vi anväder namn denna gång för responseJson säger ingenting om vad som har uppdaterats

            }).catch((error) => {
              console.error(error);
            });

    }

    render() {

    //if (!this.props.visible) {
     //return false; 
  //}
  
    return (
        <LinearGradient colors={['#5b86e5', '#36D1DC']} style={styles.container}>
      <View style={styles.container}>
      <View style={styles.knappen}>
      <Switch style={styles.button}
            value={this.state.switchValue}
            onValueChange={(val) => this.setState({ switchValue : val })}
            />
            <Text style={styles.buttontext}>
            Avståndssensor:</Text>
    </View>
          <Slider style={styles.slider}

          step={1}
          maximumValue={100}
          value={this.state.valueHot}
          onValueChange={val => this.setState({ valueHot: val })}
          onSlidingComplete={ this.UpdateDataToServer}
        />
                <Text style={styles.slidertext}>
          Varmt: {this.state.value + "%"}
        </Text>
    <Slider style={styles.slider}
          step={1}
          maximumValue={100}
          value={this.state.valueCold}
          onValueChange={val => this.setState({ valueCold: val })}
          onSlidingComplete={ this.UpdateDataToServer}
        />

        <Text style={styles.slidertext}>
          Kallt: {this.state.value1 + "%"}
        </Text>
      </View>
    </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 25,
    alignItems: "stretch",
    justifyContent: "center",
    
    
  },

  slidertext: {
      fontSize: 15,
      justifyContent: "center",
      alignItems: "center",
      //transform: [{ rotate: '90deg'}],
  },

  slider: {
    marginLeft: 5,
    marginRight: 5,
  },

  button: {
      justifyContent: "center",
  },

  buttontext: {
    fontSize: 15,

  },
  knappen: {
    alignItems: "center",
  },

});
*/

