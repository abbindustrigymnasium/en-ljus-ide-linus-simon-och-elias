import React, { Component } from "react";
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, Animated, StatusBar, TextInput } from "react-native";
import { LinearGradient } from 'expo';


export default class Login extends Component {

	componentDidMount(){
		let self= this;
			fetch("http://iot.abbindustrigymnasium.se:3001/grupp1/1", {
				method: "GET"
				}).then((response) => response.json()).then((responseJson)=>{
				console.log(responseJson);

				var resultat = responseJson.result;
				if (responseJson.message = "light1"){
					if (responseJson.result.lenght!=0){
						self.setState({
							products: resultat
						})
					}
                else
                alert("not found")
				console.log(this.state);
			}
		}).catch((error)=>{
			console.error(error);
		});
    }

    constructor(){
        super();
        this.state={
            imageURL : "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png",
            //zIndex: new Animated.Value(-10), //index value
            str: new Animated.Value("strength"), //idk why no put strength
            strength: [],
        }
    }

    Load_New_Image=()=>{
        this.setState({
            imageURL : "https://i.imgur.com/d3is5pq.png"
        })
    }
/*
    InfoAnimation = () => { //infoamiationen
        Animated.timing(this.state.zIndex, {
            toValue: 10,
            useNativeDriver: true,
        }).start(() => {

        });
    }
*/

LampOnOff = () => {
    Animated.timing(this.state.str, {
        toValue: str,
        useNativeDriver: true,
    }).start(() => {

    });
}

WriteOutFromBackend(){
    return this.state.products.map((produkt) => {
        return (
            <View key={produkt.key}> 
                <Text style={styles.componentrecentcontenttext}> 
                    {produkt.name} kostar {produkt.price} kr
                </Text>
            </View>
        )
    })
}

InsertDataToServer=() => {
    const {Name} = this.state;
    const {Price} = this.state;
    console.log("responseJSON");
        if (Name!=""){
            fetch(this.adress,{
                method: "POST",
                headers: {
                    "Accept": "application/jqson",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: Name,
                    price: Price
                })
            }).then((response) => response.json()).then(responseJson => {
                console.log(responseJson.Product[0].name);
                console.log(responseJson);
                alert(responseJson.message +", "+ responseJson.Product[0]);
            }).catch((error)=>{
                console.log(error);
            });
        }
        else
    alert("Name is empty");
}

UpdateDataToServer=() => {
    const {Name} = this.state;
    const {Price} = this.state;

        if (Name!=""){
            fetch(this.adress+"/"+Name, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify({
                    name: Name,
                    price: Price
                })
                
            }).then((response) => response.json()).then(responseJson => {
                console.log(responseJson);
                alert("Update was successfull, "+Name);
            }).catch((error)=>{
                console.error(error);
            });
    }
    else
    alert("Name is empty");
}

DeleteDataFromServer=() => {
    const {Name} = this.state;
    const {Price} = this.state;

        if (Name!=""){
            fetch(this.adress+"/"+Name,{
                method: "Delete",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: Name,
                    price: Price,	 
                    })		   
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    alert( "Delete was successfull, "+ Name);
                }).catch((error) => {
                console.error(error);
            });
        }
        else
            alert("Write a name and a price.")
        }

        /* //info knapp
            <TouchableOpacity onPress={this.InfoAnimation}>
                <Image style={styles.iconss}
                    source={{uri:"https://i.imgur.com/ckCwx8E.png"}}>
                </Image>
            </TouchableOpacity>
        */

    render() {
        if (!this.props.visible) {
            return false;
        }
        return (
            <View style={styles.container}>

                <LinearGradient colors={['#5b86e5', '#36D1DC']} style={styles.container}>

                    <View style={styles.appleicons}/>

                        <KeyboardAvoidingView behavior="padding" style={styles.container}>
                        <View style={styles.flexdirection}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenHowTo', {})}>
                                    <Image style={styles.icons}
                                        source={{uri:"https://i.imgur.com/WgNnO3R.png"}}>
                                    </Image>
                                </TouchableOpacity>
                                <Image style={styles.icons}
                                    opacity={0.35}
                                    source={{uri:"https://i.imgur.com/q8yK9xy.png"}}> 
                                </Image>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenHome', {})}>
                                    <Image style={styles.icons} 
                                        source={{uri:"https://i.imgur.com/aMWWAck.png"}}> 
                                    </Image>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.logoContainer}>
                                <TouchableOpacity onPress={this.Load_New_Image}>
                                    <Image style={styles.logo} source={{uri: this.state.imageURL}}/>
                                </TouchableOpacity>
                                <Text style={styles.title}>En ljus ide</Text>
                            </View>

                            <View style={styles.container1}>

                                <StatusBar barStyle="light-content"/>

                                <TextInput
                                    placeholder="namn eller email"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.passwordInput.focus()}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={styles.input}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                />

                                <TextInput
                                    placeholder="lösenord"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    returnKeyType="go"
                                    secureTextEntry
                                    style={styles.input}
                                    ref={(input) => this.passwordInput = input}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                />
                                
                                <TouchableOpacity style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>LOGGA IN</Text>
                                </TouchableOpacity>

                            </View>

                        </KeyboardAvoidingView>

                </LinearGradient>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container1: {
        padding: 20,
    },
    logoContainer: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
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
    shadow: { //gör det transparent någonstans idk kom på något
        backgroundColor: "rgba(0,0,0,0.75)",
        width: 1000,
        height: 1000,
        position: "absolute",
    },
    */
    appleicons: {
        backgroundColor: "rgba(0,0,0,0.1)",
        paddingVertical: 11,
    },
    icons: {
        height: 35,
        width: 35,
        marginHorizontal: 10,
    },
    /*
    iconss: {
        height: 35,
        width: 35,
        marginHorizontal: 100, //123 inte lika på alla skärmar
    },
    */
    input: {
        height: 40,
        backgroundColor: "rgba(0,0,0,0.15)",
        marginBottom: 10,
        color: "#ffffff",
        paddingHorizontal: 10,
        borderRadius: 7.5,
    },
    buttonContainer: {
        backgroundColor: "rgba(0,0,0,0.15)",
        paddingVertical: 15,
        borderRadius: 7.5,
    },
    buttonText: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "700",
    },
    flexdirection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 10,
    },
});