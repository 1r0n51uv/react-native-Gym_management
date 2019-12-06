
import React , {Component} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

class Privacy extends Component{

    state = {
        accepted: false
    };


    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Termini e condizioni</Text>
                <ScrollView
                    style={styles.tcContainer}
                    onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                            this.setState({
                                accepted: true
                            })
                        }
                    }}
                >
                    <Text style={styles.tcP2}>Benvenuti sulla nostra App. Se continui ad utilizzare questa App, accetti di rispettare e di essere vincolato dai seguenti termini e condizioni d'uso, che insieme alla nostra politica sulla privacy regolano il rapporto di Fit & Fight s.a.s. Di Stefano D'Alessandro & C. con te in relazione a questa App. Se non sei d'accordo con una parte di questi termini e condizioni, ti preghiamo di non utilizzare la nostra App.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Il contenuto delle pagine di questa App è solo a scopo informativo e di utilizzo. E' soggetto a modifiche senza preavviso.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Informatica, con le seguenti finalità: Gestire specifiche richieste inoltrate all’azienda tramite Sito Web</Text>
                    <Text style={styles.tcL}>{'\u2022'} BASE GIURIDICA: </Text>
                    <Text style={styles.tcL}>La base giuridica su cui si fonda il trattamento per i dati comuni, secondo l’Art.6 del Regolamento GDPR, è: La società tratta i dati facoltativi degli utenti in base al consenso, ossia mediante l’approvazione esplicita della presente policy privacy e in relazione alle modalità e finalità di seguito descritte</Text>
                    <Text style={styles.tcL}>{'\u2022'} CATEGORIE DI DESTINATARI</Text>
                    <Text style={styles.tcL}>Ferme restando le comunicazioni eseguite in adempimento di obblighi di legge e contrattuali, tutti i dati raccolti ed elaborati potranno essere comunicati esclusivamente per le finalità sopra specificate alle seguenti categorie di destinatari: </Text>
                    <Text style={styles.tcL}>{'\u2022'} Contitolari</Text>
                    <Text style={styles.tcL}>{'\u2022'} Titolare del trattamento;</Text>
                    <Text style={styles.tcL}>{'\u2022'} Firebase;</Text>
                    <Text style={styles.tcL}>Nella gestione dei suoi dati, inoltre, possono venire a conoscenza degli stessi le seguenti categorie di persone autorizzate e/o responsabili interni ed esterni individuati per iscritto ed ai quali sono state fornite specifiche istruzioni scritte circa il trattamento dei dati</Text>
                    <Text style={styles.tcL}>{'\u2022'} PERIODO DI CONSERVAZIONE</Text>

                    <Text style={styles.tcL}> Il periodo di conservazione dei dati è: I dati vengono mantenuti fino all’adempimento delle finalità per cui sono stati raccolti, in seguito vengono conservati in un Database di Firebase Storage per un eventuale necessità di riutilizzo dei dati stessi.</Text>
                    <Text style={styles.tcL}>{'\u2022'} DIRITTI DELL’INTERESSATO</Text>
                    <Text style={styles.tcL}>Ai sensi del Regolamento europeo 679/2016 (GDPR) e della normativa nazionale in vigore, l’interessato può, secondo le modalità e nei limiti previsti dalla vigente normativa, esercitare i seguenti diritti:</Text>

                    <Text style={styles.tcL}>{'\u2022'} Richiedere la conferma dell’esistenza di dati personali che lo riguardano (diritto di accesso dell’interessato – art. 15 del Regolamento 679/2016);</Text>
                    <Text style={styles.tcL}>{'\u2022'} Conoscerne l’origine;</Text>
                    <Text style={styles.tcL}>{'\u2022'} Riceverne comunicazione intelligibile;</Text>
                    <Text style={styles.tcL}>{'\u2022'} Avere informazioni circa la logica, le modalità e le finalità del trattamento;</Text>
                    <Text style={styles.tcL}>{'\u2022'} Richiederne l’aggiornamento, la rettifica, l’integrazione, la cancellazione, la trasformazione in forma anonima, il blocco dei dati trattati in violazione di legge, ivi compresi quelli non più necessari al perseguimento degli scopi per i quali sono stati raccolti (diritto di rettifica e cancellazione – artt. 16 e 17 del Regolamento 679/2016);</Text>
                    <Text style={styles.tcL}>{'\u2022'} Diritto di limitazione e/o di opposizione al trattamento dei dati che lo riguardano (art. 18 del Regolamento 679/2016);</Text>
                    <Text style={styles.tcL}>{'\u2022'} Diritto di revoca;</Text>
                    <Text style={styles.tcL}>{'\u2022'} Diritto alla portabilità dei dati (art. 20 del Regolamento 679/2016);</Text>
                    <Text style={styles.tcL}>{'\u2022'} Nei casi di trattamento basato su consenso, ricevere i propri dati forniti al titolare, in forma strutturata e leggibile da un elaboratore di dati e in un formato comunemente usato da un dispositivo elettronico;</Text>
                    <Text style={styles.tcL}>{'\u2022'} Il diritto di presentare un reclamo all’Autorità di controllo (diritto di accesso dell’interessato – art. 15 del Regolamento 679/2016).</Text>


                    <Text style={styles.tcL}>Titolare del trattamento dei Suoi dati personali è Fit & Fight s.a.s. Di Stefano D'Alessandro & C., p.iva 05737660653 </Text>
                    <Text style={styles.tcL}>Email: palestra.fit.fight@gmail.com</Text>
                    <Text style={styles.tcL}>PEC: dalessandro.stefano@pecaruba.it</Text>
                    <Text style={styles.tcL}>Telefono: 3272911356</Text>
                    <Text style={styles.tcL}>Contitolari del trattamento dei Suoi dati personali sono:</Text>
                    <Text style={styles.tcL}>STEFANO D'ALESSANDRO</Text>
                    <Text style={styles.tcL}>ELISABETTA PUGLIA</Text>


                </ScrollView>

                <TouchableOpacity  disabled={ !this.state.accepted } onPress={ ()=>  this.props.returnTerms(this.state.accepted) } style={ this.state.accepted ? styles.button : styles.buttonDisabled }><Text style={styles.buttonLabel}>Accept</Text></TouchableOpacity>
            </View>
        );
    }

}

const { width , height } = Dimensions.get('window');

const styles = {

    container:{
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center'
    },
    title: {
        fontSize: 22,
        alignSelf: 'center'
    },
    tcP: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12
    },
    tcP2:{
        marginTop: 10,
        fontSize: 12
    },
    tcL:{
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12
    },
    tcContainer: {
        marginTop: 15,
        marginBottom: 15,
        height: height * .7
    },

    button:{
        backgroundColor: '#136AC7',
        borderRadius: 5,
        padding: 12,
        marginBottom: 20
    },

    buttonDisabled:{
        backgroundColor: '#999',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },

    buttonLabel:{
        fontSize: 14,
        color: '#FFF',
        alignSelf: 'center',
    }

}

export default Privacy;
