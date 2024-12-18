import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Contêiner principal de toda a aplicação
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  // Estilo do cabeçalho que contém o botão "Get Albums"
  header: {
    backgroundColor: '#000000', 
    padding: 20,
    alignItems: 'center', 
    top: 10
  },

  // O contêiner que envolve a câmera
  camera: {
    flex: 1, 
    width: '100%',
    justifyContent: 'flex-end', 
  },

  // Contêiner para os botões que controlam a câmera (flip e take picture)
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 20, 
    width: '100%',
  },  

  // Contêiner que mostra a pré-visualização da foto capturada
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

  // Imagem capturada da câmera
  image: {
    width: '100%', 
    height: '80%', 
    borderRadius: 10, 
    resizeMode: 'cover', 
  },

  // Contêiner de cada álbum exibido
  albumContainer: {
    backgroundColor: '#1c1c1c',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
  },

  // Contêiner que exibe todas as miniaturas de fotos de um álbum
  albumAssetsContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
  },

  // Miniatura de cada imagem de um álbum
  albumAsset: {
    width: 80, 
    height: 80, 
    borderRadius: 5, 
    margin: 5, 
  },

  // Botão flutuante de fechar o álbum
  closeButton: {
    position: 'absolute', // Garante que o botão esteja acima de tudo
    top: 30, // Posicionado na parte superior da tela
    right: 10, // No canto superior direito
    backgroundColor: '#FF6347', // Vermelho (tom de "alerta")
    padding: 10, 
    borderRadius: 8, 
    zIndex: 10, // Garante que esteja acima de qualquer outra camada
  },
  
  // Mensagem de erro ou de aviso (como falta de permissão)
  message: {
    color: '#FFF', 
    fontSize: 18,
    textAlign: 'center', 
    marginBottom: 20, 
  },
});
