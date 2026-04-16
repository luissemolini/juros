import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';


export default function App() {
const [valor, setValor] = useState ("");
const [taxa, setTaxa] = useState("");
const [meses, setMeses] = useState("");
const [resultado, setResultado] = useState (null);

const calcular = async () => {
  try{
    const response = await fetch('http://10.0.2.2:3000/calcular',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({valor, taxa, meses}),
    });

const data = await response.json();
setResultado(data);

  } catch (error){
    console.log(error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Juros Simples</Text>
      <TextInput style={styles.input}
      placeholder="Valor"
      keyboardType="numeric"
      onChangeText={setValor}
      />
      <TextInput style={styles.input}
      placeholder="taxa (%)"
      keyboardType="numeric"
      onChangeText={setTaxa}
      />

      <TextInput style={styles.input}
      placeholder="Meses"
      keyboardType="numeric"
      onChangeText={setMeses}
      />

      <Button title="Calcular" onPress={calcular}/>

      {resultado && (
        <View> 
          <Text>Juros: R$ {resultado.juros}</Text>
          <Text>Total: R$ {resultado.total}</Text>
        </View>
      )}
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },

  titulo:{
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    padding:10,
    marginBottom: 10,
    borderRadius: 5,
  },

  resultado: {
    marginTop: 20,
    alignItems: 'center'
  }
});
