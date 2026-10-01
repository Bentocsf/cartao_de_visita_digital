import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  TextInput,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [bio, setBio] = useState('');
  const [bioTemporaria, setBioTemporaria] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [receberNotificacoes, setReceberNotificacoes] = useState(false);
  const [mensagemNotificacao, setMensagemNotificacao] = useState('');

  function abrirModal() {
    setBioTemporaria(bio);
    setModalVisivel(true);
  }

  function salvarBio() {
    setBio(bioTemporaria);
    setModalVisivel(false);
  }

  function cancelarEdicao() {
    setModalVisivel(false);
  }
  function salvarDados() {
    Alert.alert('Dados salvos com sucesso!');
  }
  useEffect(() => {
    if (!receberNotificacoes) {
      setMensagemNotificacao('');
      return;
    }

    const mensagens = [
      'Aqui está a notificação!',
      'Levante um pouco!',
      'Beba água!',
      'Hora de descansar!',
    ];

    const intervalo = setInterval(() => {
      const indiceAleatorio = Math.floor(Math.random() * mensagens.length);
      setMensagemNotificacao(mensagens[indiceAleatorio]);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [receberNotificacoes]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.conteudo}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUKSFMKaTaRKsmswIUKIqdLsTB3Q46LTRAOw2wHlLF1Q&s=10',
            }}
            style={styles.avatar}
          />

          <Text style={styles.nome}>Bento Correa Silva Freire</Text>

          <View style={styles.bioContainer}>
            <Text style={styles.bioTitulo}>Bio</Text>

            <View style={styles.bioTextoContainer}>
              <Text style={styles.bioTexto}>{bio}</Text>
            </View>

            <Pressable style={styles.botao} onPress={abrirModal}>
              <Text style={styles.botaoTexto}>Editar Bio</Text>
            </Pressable>
          </View>
          <View style={styles.configContainer}>
            <Text style={styles.configTitulo}>Configurações</Text>

            <View style={styles.configLinha}>
              <Text style={styles.configTexto}>Receber Notificações</Text>

              <Switch
                value={receberNotificacoes}
                onValueChange={setReceberNotificacoes}
              />
            </View>
          </View>
          <Pressable style={styles.botaoSalvar} onPress={salvarDados}>
            <Text style={styles.botaoTexto}>Salvar</Text>
          </Pressable>
        </ScrollView>
        {mensagemNotificacao !== '' && (
          <View style={styles.notificacaoContainer}>
            <Text style={styles.notificacaoTexto}>
              {mensagemNotificacao}
            </Text>
          </View>
        )}
      </SafeAreaView>
      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={cancelarEdicao}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Editar Bio</Text>

            <TextInput
              style={styles.bioInput}
              placeholder="Escreva um pouco sobre você..."
              value={bioTemporaria}
              onChangeText={setBioTemporaria}
              multiline
            />

            <View style={styles.botoesModal}>
              <Pressable
                style={[styles.botao, styles.botaoCancelar]}
                onPress={cancelarEdicao}
              >
                <Text style={styles.botaoTexto}>Cancelar</Text>
              </Pressable>

              <Pressable style={styles.botao} onPress={salvarBio}>
                <Text style={styles.botaoTexto}>Salvar Bio</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
  conteudo: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 100,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 2,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bioContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    borderWidth: 1,
  },
  bioTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bioTextoContainer: {
    width: '100%',
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  bioTexto: {
    fontSize: 16,
    color: '#333333',
  },
  botao: {
    backgroundColor: '#2878B5',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bioInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
  },
  botoesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  botaoCancelar: {
    backgroundColor: '#777777',
    flex: 1,
  },
  configContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
  },
  configTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  configLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  configTexto: {
    fontSize: 16,
  },
  notificacaoContainer: {
    position: 'absolute',
    bottom: 12,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 5,
  },
  notificacaoTexto: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  botaoSalvar: {
    backgroundColor: '#2878B5',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
});