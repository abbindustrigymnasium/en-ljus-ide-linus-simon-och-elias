import React from "react";
import Slider from "react-native-slider";
import { AppRegistry, StyleSheet, View, Text, Switch } from "react-native";
import { LinearGradient, Constants } from 'expo';

export default class Componentfunction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Name: "1", 
            value: 100, 
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
            Avståndssensor: </Text>
    </View>
          <Slider style={styles.slider}

          step={1}
          maximumValue={100}
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
          onSlidingComplete={ this.UpdateDataToServer}
        />
                <Text style={styles.slidertext}>
          Varmt: {this.state.value}
        </Text>
    <Slider style={styles.slider}
          step={1}
          maximumValue={100}
          value1={this.state.value1}
          onValueChange={value1 => this.setState({ value1 })}
          onSlidingComplete={ this.UpdateDataToServer}
        />

        <Text style={styles.slidertext}>
          Kallt: {this.state.value1}
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
