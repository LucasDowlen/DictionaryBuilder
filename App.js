import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';
// import {ScrollView} from "react-native-web";




export default function App() {
    // const notSearching = <Text style={styles.title}>Dictionary</Text>;
    const searching = <TextInput style={styles.searchBar}/>;
    const [wordData, setWordData] = useState([]);
    // const [definitionsList, setDefList] = useState([]);

    // let newDefList = [[], []];
    let newDefList = [];

    // newDefList[0] = [];
    // newDefList[0][0] = [];
    // newDefList[0][0][0] = [];

    const endpoint = 'entries';
    const languageCode = 'en';
    let wordID = 'broken';
    // still bugs out for certian words (needs fix)


    const searchWord = () => {

        // console.log("click");

        let ApiCall = `https://api.dictionaryapi.dev/api/v2/${endpoint}/${languageCode}/${wordID}`;

        // console.log("Pre-1");

        axios.get(ApiCall)
            .then(response => {
                console.log(response['data']);
                setWordData(response['data']);
            });
    }

    const defSorter = (id) => {
        // console.log("S1");
        //
        // console.log("Passed ID: " + id);

        console.log("KEOWF " + id);
        console.log(newDefList);
        console.log(newDefList[id]);

        return newDefList[id].map((item, key) => {
            // console.log("S2");
            // console.log("ID: " + id + "  Passed Key: " + key);
            // console.log(newDefList);
            return (
                <Text>
                    <Text key={key}>{'\n'}L0EX: {newDefList[id][key][0]}</Text>
                    {newDefList[id][key][1] ? <Text>{'\n'} L1Ex: {newDefList[id][key][1]}</Text> : null}
                    {newDefList[id][key][2].length ? <Text>{'\n'} L2Ex: {newDefList[id][key][2]}</Text> : null}
                    {newDefList[id][key][3].length ? <Text>{'\n'} L3Ex: {newDefList[id][key][3]}</Text> : null}
                </Text>
            )

            // return(<Text>Hey</Text>);
        })
    }

    const wordTensesScaffold = (item, key) => {

        // console.log("TENSES");

        return (
            <View style={styles.wordDef}>
                <Text style={[styles.wordInfo, styles.word]}>{item['word']}</Text>
                <Text style={styles.wordInfo}>{item['meanings'][0]['partOfSpeech']}</Text>
                {/*<Text style={styles.wordInfo}>{item['meanings'][0]['definitions'][0]['definition']}</Text>*/}
                <Text style={styles.wordInfo}>
                    {defSorter(key)}
                </Text>

                <Text style={styles.wordInfo}>{item['phonetic']}</Text>
                {/*<Text style={styles.wordInfo}>{mapped[0]['definitions'][0]['example']}</Text>*/}
                {/*<Text style={styles.wordInfo}>{mapped[0]['definitions'][0]['antonyms']}</Text>*/}
                {/*<Text style={styles.wordInfo}>{mapped[0]['definitions'][0]['synonyms']}</Text>*/}

                {/*<Text style={styles.wordInfo}>Ex: {item['meanings'][0]['definitions'][0]['example']}</Text>*/}
                {/*<Text style={styles.wordInfo}>Antonyms: {item['meanings'][0]['definitions'][0]['antonyms']}</Text>*/}
                {/*<Text style={styles.wordInfo}>Synonyms: {item['meanings'][0]['definitions'][0]['synonyms']}</Text>*/}
                {/*<Text style={styles.wordInfo}>Origin: {item['origin']}</Text>*/}
            </View>
        )
    }

    const wordDefScaffold = () => {

        // console.log("DEF SCAF");

        // let newDefList = [[], []];
        // the above line might be unnesesary and (seems) destructive

        // console.log("wordData");
        // console.log(wordData);


        //below called twice (maybe??);
        return wordData.map((item, key) => {

            console.log("ITEM: ");
            console.log(wordData.length);
            console.log(wordData[0]['meanings'].length);

            // console.log("ITEM: ");
            // console.log(item);

            // console.log(word);
            // let word = item['meanings'][0]['definitions']['partOfSpeech'];
            console.log(item['meanings'][0]['partOfSpeech']);


            for (let i = 0; i < (item['meanings'].length); i++) {
                if (!newDefList[i]) newDefList[i] = [];

                console.log("I: " + i);
                for (let j = 0; j < item['meanings'][i]['definitions'].length; j++) {
                    console.log("J: " + j);
                    if(!newDefList[i][j]) newDefList[i][j] = [];

            // for (let i = 0; i < (wordData.length); i++) {
            //     if (!newDefList[i]) newDefList[i] = [];
            //
            //     console.log("I: " + i);
            //     for (let j = 0; j < wordData[i]['meanings'].length; j++) {
            //         console.log("J: " + j);
            //         if(!newDefList[i][j]) newDefList[i][j] = [];

                    // <Text style={styles.wordInfo}>Ex: {item['meanings'][0]['definitions'][0]['example']}</Text>
                    // <Text style={styles.wordInfo}>Antonyms: {item['meanings'][0]['definitions'][0]['antonyms']}</Text>
                    // <Text style={styles.wordInfo}>Synonyms: {item['meanings'][0]['definitions'][0]['synonyms']}</Text>
                    //
                    // newDefList[i][j] = item['meanings'][i]['definitions'][j]['definition'];


                    // console.log(newDefList);
                    // console.log("ADDED:")
                    // console.log(newDefList);

                    console.log("DEF: " + item['meanings'][i]['definitions'][j]['definition']);

                    newDefList[i][j][0] = item['meanings'][i]['definitions'][j]['definition'];

                    newDefList[i][j][1] = item['meanings'][i]['definitions'][j]['example'];
                    newDefList[i][j][2] = item['meanings'][i]['definitions'][j]['antonyms'];
                    newDefList[i][j][3] = item['meanings'][i]['definitions'][j]['synonyms'];



                    // console.log("TEST: " + i + ":" + j + " " + item['meanings'][i]['definitions'][j]['definition'])

                    // if(i === (item['meanings'].length) && j === item['meanings'][i]['definitions'].length) {
                    //     setDefList(newDefList);
                    // }
                }
            }
            // console.log("SetDefList");
            // console.log(newDefList);

            // Current return needs to loop over every 'meaning' on item not just one
            return (
                <View>
                    <Text>{wordTensesScaffold(item, key)}</Text>
                </View>
                // <View style={styles.wordDef} key={key}>
                //     <Text style={[styles.wordInfo, styles.word]}>{item['word']}</Text>
                //     <Text style={styles.wordInfo}>{item['meanings'][0]['partOfSpeech']}</Text>
                //     {/*<Text style={styles.wordInfo}>{item['meanings'][0]['definitions'][0]['definition']}</Text>*/}
                //     <Text style={styles.wordInfo}>
                //         {defSorter(key)}
                //     </Text>
                //
                //     <Text style={styles.wordInfo}>{item['phonetic']}</Text>
                //     <Text style={styles.wordInfo}>{item['meanings'][0]['definitions'][0]['example']}</Text>
                //     <Text style={styles.wordInfo}>{item['meanings'][0]['definitions'][0]['antonyms']}</Text>
                //     <Text style={styles.wordInfo}>{item['meanings'][0]['definitions'][0]['synonyms']}</Text>
                //     <Text style={styles.wordInfo}>{item['origin']}</Text>
                // </View>
            )
        })
    }

    return (
        <ScrollView style={styles.body}>

            <View style={styles.headerContainer}>
                {searching}
                <TouchableOpacity style={styles.search} onPress={() => searchWord()}>
                    {/*style={{position: 'absolute', marginTop: 54, right: 30}*/}
                    <FontAwesomeIcon icon={faSearch} size={19}/>
                </TouchableOpacity>
            </View>

            <View>
                {wordDefScaffold()}
            </View>

            <StatusBar style="auto"/>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        // width: 300,
        // height: 300,
        // backgroundColor: "black",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        height: 90,
        borderBottomWidth: 1.3,
        backgroundColor: "#81d3dc",
        borderBottomColor: "#6ca2a6",
    },
    title: {
        // fontFamily: "Times New Roman",
        marginTop: 50,
        zIndex: 1,
        fontSize: 22,
        fontWeight: "500",
    },
    search: {
        position: "absolute",
        marginTop: 54,
        // fontSize: 30,
        // marginLeft: 20,
        right: 30,
    },
    searchBar: {
        // zIndex: 3,
        width: 200,
        height: 30,
        marginTop: 50,
        borderWidth: 1,
        paddingLeft: 5,
        fontSize: 15,
    },
    wordDef: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    wordInfo: {
        marginBottom: 10,
    },
    word: {
        fontSize: 18,
    }
});
