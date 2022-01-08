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

    let newDefList = [[], []];

    const endpoint = 'entries';
    const languageCode = 'en';
    let wordID = 'test';
    // still bugs out for certian words (needs fix)


    const searchWord = () => {

        console.log("click");

        let ApiCall = `https://api.dictionaryapi.dev/api/v2/${endpoint}/${languageCode}/${wordID}`;

        console.log("Pre-1");

        axios.get(ApiCall)
            .then(response => {
                console.log(response['data']);
                setWordData(response['data']);
            });
    }

    const defSorter = (id) => {
        console.log("S1");

        console.log("Passed ID: " + id);

        return newDefList[id].map((item, key) => {
            console.log("S2");
            console.log("ID: " + id + "  Passed Key: " + key);
            console.log(newDefList);
            return (
                <Text key={key}>{newDefList[id][key]} {'\n'}</Text>
            )
        })
    }

    // const wordTensesScaffold = (item) => {
    //
    //     console.log("TENSES");
    //
    //     return item['meanings'].map((mapped, index) => {
    //         console.log("TENSES1");
    //         return (
    //             <View style={styles.wordDef} key={key}>
    //                 <Text style={[styles.wordInfo, styles.word]}>{item['word']}</Text>
    //                 <Text style={styles.wordInfo}>{item['meanings'][0]['partOfSpeech']}</Text>
    //                 {/*<Text style={styles.wordInfo}>{item['meanings'][0]['definitions'][0]['definition']}</Text>*/}
    //                 <Text style={styles.wordInfo}>
    //                     {defSorter(key)}
    //                 </Text>
    //
    //                 <Text style={styles.wordInfo}>{item['phonetic']}</Text>
    //                 <Text style={styles.wordInfo}>{mapped[0]['definitions'][0]['example']}</Text>
    //                 <Text style={styles.wordInfo}>{mapped[0]['definitions'][0]['antonyms']}</Text>
    //                 <Text style={styles.wordInfo}>{mapped[0]['definitions'][0]['synonyms']}</Text>
    //                 <Text style={styles.wordInfo}>{item['origin']}</Text>
    //             </View>
    //         )
    //     })

    const wordDefScaffold = () => {

        console.log("DEF SCAF");

        // let newDefList = [[], []];
        // the above line might be unnesesary and (seems) destructive


        return wordData.map((item, key) => {

            console.log("ITEM: ");
            console.log(item);

            // console.log(word);
            // let word = item['meanings'][0]['definitions']['partOfSpeech'];
            console.log(item['meanings'][0]['partOfSpeech']);


            for (let i = 0; i < (item['meanings'].length); i++) {
                for (let j = 0; j < item['meanings'][i]['definitions'].length; j++) {
                    // newDefList[i] = [];
                    newDefList[i][j] = item['meanings'][i]['definitions'][j]['definition'];
                    console.log("TEST: " + i + ":" + j + " " + item['meanings'][i]['definitions'][j]['definition'])

                    // if(i === (item['meanings'].length) && j === item['meanings'][i]['definitions'].length) {
                    //     setDefList(newDefList);
                    // }
                }
            }
            console.log("SetDefList");
            console.log(newDefList);

            // Current return needs to loop over every 'meaning' on item not just one
            return (
                // <Text>{wordTensesScaffold(item)}</Text>
                <View style={styles.wordDef} key={key}>
                    <Text style={[styles.wordInfo, styles.word]}>{item['word']}</Text>
                    <Text style={styles.wordInfo}>{item['meanings'][0]['partOfSpeech']}</Text>
                    {/*<Text style={styles.wordInfo}>{item['meanings'][0]['definitions'][0]['definition']}</Text>*/}
                    <Text style={styles.wordInfo}>
                        {defSorter(key)}
                    </Text>

                    <Text style={styles.wordInfo}>{item['phonetic']}</Text>
                    <Text style={styles.wordInfo}>{item['meanings'][0]['definitions'][0]['example']}</Text>
                    <Text style={styles.wordInfo}>{item['meanings'][0]['definitions'][0]['antonyms']}</Text>
                    <Text style={styles.wordInfo}>{item['meanings'][0]['definitions'][0]['synonyms']}</Text>
                    <Text style={styles.wordInfo}>{item['origin']}</Text>
                </View>
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
