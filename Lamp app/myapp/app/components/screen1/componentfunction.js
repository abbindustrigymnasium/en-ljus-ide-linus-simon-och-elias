import React from "react";
import Slider from "react-native-slider";
import { AppRegistry, StyleSheet, View, Text } from "react-native";

export default class Componentfunction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lampname: "Lampgod", 
            value: 100, 
            fetch:'http://iot.abbindustrigymnasium.se:3001/grupp1_light/' 
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

        var adress=this.state.fetch;
        var strength =(value*10);

        jsonbody= JSON.stringify({
            name: lampname,
                  strength: strength,
                  hard:1,
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
      <View style={styles.container}>
          <Slider
          step={1}
          maximumValue={100}
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
          onSlidingComplete={ this.UpdateDataToServer}
        />
        <Text style={styles.slidertext}>
          Value: {this.state.value}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 25,
    marginLeft: 0,
    marginRight: 0,
    alignItems: "stretch",
    backgroundColor: 'rgba(0, 203, 0, 1)',
    justifyContent: "center",
    
    
  },

  slidertext: {
      fontSize: 35,
  },

});
