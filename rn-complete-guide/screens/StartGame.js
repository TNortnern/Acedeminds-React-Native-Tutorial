import React, { useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGame = (props) => {
    const [enteredValue, setValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setNumber] = useState();
    const numberInputHandler = inputText => {
        setValue(inputText.replace(/[^0-9]/g, ''))
    };

    const resetInput = () => {
        setValue('');
        setConfirmed(false);
    };

    const confirmInput = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert
            ('Invalid Number!', 
            'Number has to be 1-99',
            [{text: 'Okay', style: 'destructive', onPress: resetInput}]
            )
            return;
        }
        setConfirmed(true);
        setNumber(chosenNumber);
        setValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = 
        <Card style={styles.summaryContainer}>
            <NumberContainer>
                {selectedNumber}
            </NumberContainer>
            <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)} />
        </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
           <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input 
                style={styles.input} 
                blurOnSubmit 
                autoCapitalize='none'
                keyboardType="numeric"
                maxLength={2} 
                onChangeText={numberInputHandler}
                value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button color={Colors.accent} title="Reset" onPress={resetInput} />
                    </View>
                    <View style={styles.button}>
                        <Button color={Colors.primary} title="Confirm" onPress={confirmInput} />
                    </View>
                </View>
           </Card>
           {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({ 
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    button: {
        width: 100
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        margin: 20,
        alignItems: 'center'
    }
});

export default StartGame;