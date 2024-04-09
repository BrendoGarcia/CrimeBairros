<?php
// Conectar ao banco de dados
$conn = new mysqli('db4free.net', 'brendofcghh', 'qwer1234', 'projetinho');

// Verificar a conexão
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

// Verificar se foi feita uma solicitação POST para registrar um crime
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Receber os dados do crime do corpo da solicitação
    $data = $_POST['data'];
    $cep = $_POST['cep'];
    $tipo_crime = $_POST['tipo_crime'];
    $detalhes = $_POST['detalhes'];

    // Preparar a consulta SQL para inserir os dados na tabela de crimes
    $sql = "INSERT INTO crimes (data, cep, tipo_crime, detalhes) VALUES ('$data', '$cep', '$tipo_crime', '$detalhes')";

    if ($conn->query($sql) === TRUE) {
        echo "Crime registrado com sucesso!";
    } else {
        echo "Erro ao registrar crime: " . $conn->error;
    }
}

// Fechar a conexão com o banco de dados
$conn->close();
?>
