import React from "react";
import Slider from "react-native-slider";
import { AppRegistry, StyleSheet, View, Text, Switch, TouchableOpacity, Image, Animated, Easing, TouchableWithoutFeedback } from "react-native";
import { LinearGradient, Constants } from 'expo';

export default class Componentfunction extends React.Component {
    constructor(props) {
        super(props);
        this.Dark = new Animated.ValueXY({ x: 10000, y: 10000 })
        this.state = {
            Name: "1", 
            value: 100,
            value1: 100,
            fetch:'http://192.168.0.112:3000/light/' 
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
        const { value } = this.state ;
        const { value1 } = this.state ;

        var adress=this.state.fetch;
        var Strength =(value*10);

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
                                <TouchableOpacity onPress={this._InfoAnimation}>
                                    <Image style={styles.icons}
                                        source={{uri:"https://i.imgur.com/CMimq9D.png"}}>
                                    </Image>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenHowTo', {})}>
                                    <Image style={styles.icons}
                                        source={{uri:"https://i.imgur.com/WgNnO3R.png"}}>
                                    </Image>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenLogin', {})}>
                                    <Image style={styles.icons}
                                        source={{uri:"https://i.imgur.com/q8yK9xy.png"}}> 
                                    </Image>
                                </TouchableOpacity>
                                    <Image style={styles.icons} 
                                        opacity={0.35}
                                        source={{uri:"https://i.imgur.com/aMWWAck.png"}}> 
                                    </Image>
                            </View>


      <View style={styles.container}>
      <View style={styles.knappen}>

      <Switch style={styles.button}
            value={this.state.switchValue}
            onValueChange={(val) => this.setState({ switchValue : val })}
            />

        
            <Text style={styles.buttontext}>
            Avståndssensor: </Text>
    </View>
    <View style={styles.flexdirectionslider}>
    <TouchableOpacity>
    <Image style={styles.iconssliderleft}
            source={{uri:"https://i.imgur.com/a8yaSvW.png"}}>
        </Image>
    </TouchableOpacity>
          <Slider style={styles.slider}

          step={1}
          maximumValue={100}
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
          onSlidingComplete={ this.UpdateDataToServer}
        />
            <TouchableOpacity>
            <Image style={styles.iconssliderright}
            source={{uri:"https://i.imgur.com/a8yaSvW.png"}}>
        </Image>
        </TouchableOpacity>
        </View>


                <Text style={styles.slidertext}>
          Varmt: {this.state.value}
        </Text>

        
        <View style={styles.flexdirectionslider}>
        <TouchableOpacity>
        <Image style={styles.iconssliderleft}
            source={{uri:"https://i.imgur.com/GiOywnt.png"}}>
        </Image>
        </TouchableOpacity>
    <Slider style={styles.slider}
          step={1}
          maximumValue={100}
          value={this.state.value1}
          onValueChange={value1 => this.setState({ value1 })}
          onSlidingComplete={ this.UpdateDataToServer}
        />
            <TouchableOpacity>
            <Image style={styles.iconssliderright}
            source={{uri:"https://i.imgur.com/GiOywnt.png"}}>
        </Image>
        </TouchableOpacity>
        </View>
        <Text style={styles.slidertext}>
          Kallt: {this.state.value1}
        </Text>


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
      //transform: [{ rotate: '90deg'}],
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

  },
  knappen: {
    alignItems: "center",
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

});
