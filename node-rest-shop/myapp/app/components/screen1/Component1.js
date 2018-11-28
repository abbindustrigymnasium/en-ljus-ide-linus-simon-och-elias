import React from 'react';
import { 
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Component,
	PropTypes,
	ReacctExpandableListView,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

export default class Component1 extends React.Component {


    render() {

        if (!this.props.visible) {
            return false;
        }
        
        return (

		<View>
            <View style={styles.component}>
				<Text style={styles.Textheader}>
					Varuhus
				</Text>
			</View>

			<TouchableOpacity>
				<View style={styles.hexplacement3}>
					<View style={styles.hex2}
						backgroundColor="#00e1ff">
					</View>
					<View style={styles.hex3}
						backgroundColor="#00e1ff">
					</View>
					<View style={styles.hex1}
						backgroundColor="#00e1ff">
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
						backgroundColor="#00e1ff">
					</View>
					<View style={styles.hex3border}
						backgroundColor="#00e1ff">
					</View>
					<View style={styles.hex1border}
						backgroundColor="#00e1ff">
					</View>
				</View>
			</TouchableOpacity>

			<TouchableOpacity>
				<View style={styles.hexplacement2}>
					<View style={styles.hex2}
						backgroundColor="#e2384a">
					</View>					
					<View style={styles.hex3}
						backgroundColor="#e2384a">
					</View>
					<View style={styles.hex1}
						backgroundColor="#e2384a">
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
						backgroundColor="#e2384a">
					</View>
					
					<View style={styles.hex3border}
						backgroundColor="#e2384a">
					</View>

					<View style={styles.hex1border}
						backgroundColor="#e2384a">
					</View>
				</View>
			</TouchableOpacity>

			<TouchableOpacity>
				<View style={styles.hexplacement1}>
					<View style={styles.hex2}
						backgroundColor="#ffa928">
					</View>
					<View style={styles.hex3}
						backgroundColor="#ffa928">
					</View>
					<View style={styles.hex1}
						backgroundColor="#ffa928">
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
						backgroundColor="#ffa928">
					</View>
					<View style={styles.hex3border}
						backgroundColor="#ffa928">
					</View>
					<View style={styles.hex1border}
						backgroundColor="#ffa928">
					</View>
				</View>
			</TouchableOpacity>
			<View style={styles.WriteTextFooter}>
            	<TextInput
					style={styles.addWriteText}
					placeholder=">price"
					placeholderTextColor="white">
				</TextInput>
			</View>
			<View style={styles.WriteTextFooter2}>
            	<TextInput
					style={styles.addWriteText}
					placeholder=">name"
					placeholderTextColor="white">
				</TextInput>
			</View>

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
			<View style={styles.componentrecentcontent}>
			</View>

			<TouchableOpacity>
				<View style={styles.draghandle}>
					<Text style={styles.draghandletext}> ↪ ↳ </Text>
				</View>
				<View style={styles.draghandleborder}>
				</View>
			</TouchableOpacity>
		</View>
		);
    }
}

const styles = StyleSheet.create({
    
	component: {
	    backgroundColor: "#e2384a",
		alignItems: "center",
		justifyContent: "center",
		borderBottomWidth: 10,
		borderBottomColor: "#e0e0e0",
	},
	
	Textheader: {
		color: '#ffffff',
	    fontSize: 25,
		padding: 26,
		FontAwesome,
	},

	hexplacement1: {
		top: 300,	
	},

	hexplacement2:{
		top: 175,
	},

	hexplacement3:{
		top: 50,
	},

	hexborderplacement1: {
		top: 298,
		zIndex:-10,
	},

	hexborderplacement2: {
		top: 173,
		zIndex:-10,
	},

	hexborderplacement3: {
		top: 48,
		zIndex:-10,
	},

	hexvitplacement1: {
		top: 299,
		zIndex:-5,
	},

	hexvitplacement2: {
		top: 174,
		zIndex:-5,
	},

	hexvitplacement3: {
		top: 49,
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
		bottom: 10,
	},

	addButtonTextminus: {
		color: "#ffffff",
		fontSize: 60,
		bottom: 16,
	},

	addButtonTextreload: {
		color: "#ffffff",
		fontSize: 35,
		top: 1,
	},

	WriteTextFooter: {
		position: "fixed",
		top: 437,
		left: 0,
		right: 0,
		zIndex: 10,
	},

	WriteTextFooter2: {
		position: "fixed",
		top: 359,
		left: 0,
		right: 0,
		zIndex: 10,
	},

	addWriteText: {
		alignSelf: "streach",
		color: "#ffffff",
		padding: 10,
		backgroundColor: "#252525",
		borderTopWidth: 2,
		BorderTopColor: "#ededed",
		width: "100%",
	},

	BackgroundStripe: {
		position: "absolute",
		left: 65,
		top: 92,
		backgroundColor: "#00b2ff",
		width: 10,
		height: 500,
		zIndex: -5,
	},

	addtitle: {
		color: "#828282",
		fontSize: 12,
		top: -161,
		left: -139,
		FontAwesome,
		transform: [{ rotate: '270deg'}],
		zIndex: 11,
	},

	removetitle: {
		color: "#828282",
		top: -39,
		left: -139,
		fontSize: 12,
		FontAwesome,
		transform: [{ rotate: '270deg'}],
		zIndex: 11,
	},

	updatetitle: {
		color: "#828282",
		left: -139,
		top: 69,
		fontSize: 12,
		FontAwesome,
		transform: [{ rotate: '270deg'}],
		zIndex: 11,
	},

	componentrecent: {
		alignItems: "center",
		justifyContent: "center",
	    backgroundColor: "#e2384a",
		borderBottomWidth: 5,
		borderBottomColor: "#e0e0e0",
		borderTopWidth: 5,
		borderTopColor: "#e0e0e0",
		borderLeftWidth: 5,
		borderLeftColor: "#e0e0e0",
		width: 165,
		left: 155,
		top: -95,
		height: 50,
	},
	
	Textheaderrecent: {
		color: '#ffffff',
	    fontSize: 16,
		FontAwesome,
	},

	componentrecentcontent: {
		alignItems: "center",
		justifyContent: "center",
	    backgroundColor: "#f9f9f9",
		borderBottomWidth: 5,
		borderBottomColor: "#e0e0e0",
		borderLeftWidth: 5,
		borderLeftColor: "#e0e0e0",
		width: 165,
		left: 155,
		top: -95,
		height: 290,
	},

	draghandle: {
		width: 70,
		height: 0,
		borderBottomWidth: 15,
		borderBottomColor: "#e2384a",
		borderLeftWidth: 12,
		borderLeftColor: "transparent",
		borderRightWidth: 12,
		borderRightColor: "transparent",
		borderStyle: "solid",
		zIndex: 11,
		transform: [{ rotate: '270deg'}],
		left: 112.5,
		bottom: 275,
		alignItems: "center",
		justifyContent: "center",
	},

	draghandletext: {
		color: '#ffffff',
	    fontSize: 16,
		FontAwesome,
		zIndex: 12,
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
		left: 67.5,
		bottom: 332.5,
	},
});