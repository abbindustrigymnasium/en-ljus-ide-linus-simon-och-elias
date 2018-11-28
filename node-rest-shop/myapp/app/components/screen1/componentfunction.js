import React from 'react';
import { 
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StatusBar,
	KeyboardAvoidingView,
    //Component,
	//ReactExpandableListView
} from 'react-native';

export default class Componentfunction extends React.Component {
	
	adress="http://192.168.0.104:3000/products"

    constructor(props){
        super(props);
			this.state = {
			Name: "",
            products: []
        }
	}

	componentDidMount(){
		let self= this;
			fetch(this.adress, {
				method: "GET"
				}).then((response) => response.json()).then((responseJson)=>{
				console.log(responseJson);

				var resultat = responseJson.result;
				if (responseJson.message = "GETTER"){
					if (responseJson.result.lenght!=0){
						self.setState({ //child and <View style={styles.componentrecentcontent}> and <View key={produkt.key}>
							products: resultat
						})
					}
				else
				alert("Please add a Name in the bottom of the screen and try again");
				console.log(this.state);
			}
		}).catch((error)=>{
			console.error(error);
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
			
    render() {

        return (

		<View>
            <View style={styles.component}>
				<Text style={styles.Textheader}>
					Varuhus
				</Text>
			</View>

			<TouchableOpacity onPress={this.InsertDataToServer}>
				<View style={styles.hexplacement3}>
					<View style={styles.hex2}
						backgroundColor="#0abde3">
					</View>
					<View style={styles.hex3}
						backgroundColor="#0abde3">
					</View>
					<View style={styles.hex1}
						backgroundColor="#0abde3">
						<Text style={styles.addButtonText}>
							+
						</Text>
					</View>
				</View>
				<View style={styles.hexvitplacement3}>
					<View style={styles.hex2vit}>
					</View>
					<View style={styles.hex3vit}>
					</View>
					<View style={styles.hex1vit}>
					</View>
				</View>
				<View style={styles.hexborderplacement3}>
					<View style={styles.hex2border}
						backgroundColor="#0abde3">
					</View>
					<View style={styles.hex3border}
						backgroundColor="#0abde3">
					</View>
					<View style={styles.hex1border}
						backgroundColor="#0abde3">
					</View>
				</View>
			</TouchableOpacity>

			<TouchableOpacity onPress={this.DeleteDataFromServer}>
				<View style={styles.hexplacement2}>
					<View style={styles.hex2}
						backgroundColor="#e74c3c">
					</View>					
					<View style={styles.hex3}
						backgroundColor="#e74c3c">
					</View>
					<View style={styles.hex1}
						backgroundColor="#e74c3c">
						<Text style={styles.addButtonTextminus}>
							-
						</Text>
					</View>
				</View>
				<View style={styles.hexvitplacement2}>
					<View style={styles.hex2vit}>
					</View>
					<View style={styles.hex3vit}>
					</View>
					<View style={styles.hex1vit}>
					</View>
				</View>
				<View style={styles.hexborderplacement2}>
					<View style={styles.hex2border}
						backgroundColor="#e74c3c">
					</View>
					
					<View style={styles.hex3border}
						backgroundColor="#e74c3c">
					</View>

					<View style={styles.hex1border}
						backgroundColor="#e74c3c">
					</View>
				</View>
			</TouchableOpacity>

			<TouchableOpacity onPress={this.UpdateDataToServer}>
				<View style={styles.hexplacement1}>
					<View style={styles.hex2}
						backgroundColor="#f39c12">
					</View>
					<View style={styles.hex3}
						backgroundColor="#f39c12">
					</View>
					<View style={styles.hex1}
						backgroundColor="#f39c12">
						<Text style={styles.addButtonTextreload}>
							↻
						</Text>
					</View>
				</View>
				<View style={styles.hexvitplacement1}>
					<View style={styles.hex2vit}>
					</View>
					<View style={styles.hex3vit}>
					</View>
					<View style={styles.hex1vit}>
					</View>
				</View>
				<View style={styles.hexborderplacement1}>
					<View style={styles.hex2border}
						backgroundColor="#f39c12">
					</View>
					<View style={styles.hex3border}
						backgroundColor="#f39c12">
					</View>
					<View style={styles.hex1border}
						backgroundColor="#f39c12">
					</View>
				</View>
			</TouchableOpacity>

			<KeyboardAvoidingView behavior="padding" style={styles.positiontest}>
				<View style={styles.WriteTextFooter2}>
					<TextInput onChangeText={(value) => this.setState({Name: value})}
						style={styles.addWriteText}
						placeholder=">price"
						placeholderTextColor="white"
						placeholder=">name"
						returnKeyType="next"
						onSubmitEditing={() => this.passwordInput.focus()}
						autoCapitalize="none"
						autoCorrect={false}>
					</TextInput>
				</View>
			</KeyboardAvoidingView>
			<KeyboardAvoidingView behavior="padding" style={styles.positiontest}>
				<View style={styles.WriteTextFooter}>
					<TextInput onChangeText={(value) => this.setState({Price: value})}
						style={styles.addWriteText}
						placeholder=">name"
						placeholderTextColor="white"
						placeholder=">price"
						returnKeyType="go"
						ref={(input) => this.passwordInput = input}>
					</TextInput>
				</View>
			</KeyboardAvoidingView>
			<View style={styles.BackgroundStripe}>
			</View>

			<Text style={styles.addtitle}>
				Add
			</Text>
			<Text style={styles.removetitle}>
				Remove
			</Text>
			<Text style={styles.updatetitle}>
				Update
			</Text>

			<View style={styles.componentrecent}>
				<Text style={styles.Textheaderrecent}>
					Recent activities
				</Text>
			</View>
			<TouchableOpacity>
				<View style={styles.draghandleborder}>
				<Text style={styles.draghandletext}>
					↳
				</Text> 
				</View>
				<View style={styles.draghandle}>
				</View>
			</TouchableOpacity>
            <View style={styles.componentrecentcontent}>
            	{this.WriteOutFromBackend()}
            </View>
		</View>
		);// why 				<Text style={styles.draghandletext}> ↳ </Text> is behind?
    }
}

const styles = StyleSheet.create({
	component: {
	    backgroundColor: "#e74c3c",
		alignItems: "center",
		justifyContent: "center",
		borderBottomWidth: 10,
        borderBottomColor: "#e0e0e0",
        position: "absolute",
        width: "100%",
	},
	
	Textheader: {
		color: '#ffffff',
	    fontSize: 25,
		padding: 26,
	},

	hexplacement1: {
        top: 395,	
	},

	hexplacement2:{
        top: 270,
	},

	hexplacement3:{
        top: 145,
	},

	hexborderplacement1: {
		top: 393,
        zIndex:-10,
	},

	hexborderplacement2: {
		top: 268,
        zIndex:-10,
	},

	hexborderplacement3: {
		top: 143,
        zIndex:-10,
	},

	hexvitplacement1: {
		top: 394,
        zIndex:-5,
	},

	hexvitplacement2: {
		top: 269,
        zIndex:-5,
	},

	hexvitplacement3: {
		top: 144,
        zIndex:-5,
	},

	hex1: {
		position: "absolute",
		height: 45,
		width: 77.94,
		zIndex: 20,
		left: 31,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		elevation: 8,
	},

	hex2: {
		position: "absolute",
		height: 45,
		width: 77.94,
		zIndex: 20,
		left: 31,
		transform: [{ rotate: '60deg'}],
		borderRadius: 5,
	},

	hex3: {
		position: "absolute",
		height: 45,
		width: 77.94,
		zIndex: 20,
		left: 31,
		transform: [{ rotate: '-60deg'}],
		borderRadius: 5,
	},

	hex1vit: {
		position: "absolute",
		height: 47.5,
		width: 82.27,
		left: 29,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		elevation: 8,
		backgroundColor: "#ffffff",
		zIndex: 19,
	},

	hex2vit: {
		position: "absolute",
		height: 47.5,
		width: 82.27,
		left: 29,
		transform: [{ rotate: '60deg'}],
		borderRadius: 5,
		backgroundColor: "#ffffff",
		zIndex: 19,
	},

	hex3vit: {
		position: "absolute",
		height: 47.5,
		width: 82.27,
		left: 29,
		transform: [{ rotate: '-60deg'}],
		borderRadius: 5,
		backgroundColor: "#ffffff",
		zIndex: 19,
	},

	hex1border: {
		position: "absolute",
		height: 50,
		width: 86.6,
		left: 27,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		elevation: 8,
		zIndex: 18,
	},

	hex2border: {
		position: "absolute",
		height: 50,
		width: 86.6,
		left: 27,
		transform: [{ rotate: '60deg'}],
		borderRadius: 5,
		zIndex: 18,
	},

	hex3border: {
		position: "absolute",
		height: 50,
		width: 86.6,
		left: 27,
		transform: [{ rotate: '-60deg'}],
		borderRadius: 5,
		zIndex: 18,
	},

	addButtonText: {
		color: "#ffffff",
		fontSize: 50,
        bottom: -5,
        position: "absolute",
	},

	addButtonTextminus: {
		color: "#ffffff",
		fontSize: 60,
        bottom: -10,
        position: "absolute",
	},

	addButtonTextreload: {
		color: "#ffffff",
		fontSize: 35,
        top: 2,
        position: "absolute",
	},

	WriteTextFooter: {
		position: "absolute",
		top: 529,
		left: 0,
		right: 0,
		zIndex: 20,
	},

	WriteTextFooter2: {
		position: "absolute",
		top: 490,
		left: 0,
		right: 0,
		zIndex: 20,
	},

	addWriteText: {
		alignSelf: "auto",
		color: "#ffffff",
		padding: 10,
		backgroundColor: "#252525",
		borderTopWidth: 2,
		width: "100%",
	},

	BackgroundStripe: {
		position: "absolute",
		left: 65,
		top: 92,
		backgroundColor: "#00d2d3",
		width: 10,
		height: 500,
		zIndex: -5,
	},

	addtitle: {
		color: "#828282",
		fontSize: 12,
		top: 161,
		left: 9,
		transform: [{ rotate: '270deg'}],
        zIndex: 11,
        position: "absolute",
	},

	removetitle: {
		color: "#828282",
		top: 285,
		left: -2,
		fontSize: 12,
		transform: [{ rotate: '270deg'}],
        zIndex: 11,
        position: "absolute",
	},

	updatetitle: {
		color: "#828282",
		left: -2,
		top: 410,
		fontSize: 12,
		transform: [{ rotate: '270deg'}],
        zIndex: 11,
        position: "absolute",
	},

	componentrecent: {
		alignItems: "center",
		justifyContent: "center",
	    backgroundColor: "#e74c3c",
		borderBottomWidth: 5,
		borderBottomColor: "#e0e0e0",
		borderTopWidth: 5,
		borderTopColor: "#e0e0e0",
		borderLeftWidth: 5,
		borderLeftColor: "#e0e0e0",
		width: 165,
		left: 155,
		top: 120,
        height: 50,
        position: "absolute",
	},
	
	Textheaderrecent: {
		color: '#ffffff',
	    fontSize: 16,
	},

	componentrecentcontent: {
		alignItems: "flex-start",
		justifyContent: "flex-start",
	    backgroundColor: "#f9f9f9",
		borderBottomWidth: 5,
		borderBottomColor: "#e0e0e0",
		borderLeftWidth: 5,
		borderLeftColor: "#e0e0e0",
		width: 165,
		left: 155,
		top: 170,
        height: 290,
        position: "absolute",
    },
    
    componentrecentcontenttext: {
        color: '#000000',
		fontSize: 16,
		marginLeft: 5,
		marginTop: 5,
    },

	draghandle: {
		width: 70,
		height: 0,
		borderBottomWidth: 15,
		borderBottomColor: "#e74c3c",
		borderLeftWidth: 12,
		borderLeftColor: "transparent",
		borderRightWidth: 12,
		borderRightColor: "transparent",
		borderStyle: "solid",
		zIndex: 11,
		transform: [{ rotate: '270deg'}],
		left: 112,
		top: 285,
		alignItems: "center",
        justifyContent: "center",
        position: "absolute",
	},

	draghandletext: {
		color: '#ffffff',
	    fontSize: 16,
		zIndex: 52,
		fontWeight: "900",
		transform: [{ rotate: '90deg'}],
		right: 0,
		top: 90,
	},

	draghandleborder: {
		width: 80,
		height: 100,
		borderBottomWidth: 20,
		borderBottomColor: "#e0e0e0",
		borderLeftWidth: 16,
		borderLeftColor: "transparent",
		borderRightWidth: 16,
		borderRightColor: "transparent",
		borderStyle: "solid",
		zIndex: 10,
		transform: [{ rotate: '270deg'}],
		left: 65,
        top: 243,
        position: "absolute",
	},
});