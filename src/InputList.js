import React, { useState, useEffect } from 'react';

const InputList = () => {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState([]);
  const [newsTitle, setNewsTitle] = useState(null);

  useEffect(() => {
    const fetchNewsTitle = async () => {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v3/noticias');
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setNewsTitle(data.items[0].titulo);
        }
      } catch (error) {
        console.error('Erro ao buscar notícia:', error);
      }
    };

    fetchNewsTitle();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddToList = () => {
    if (inputValue.trim() !== '') {
      setList([...list, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div>
      <h2>Notícia de destaque do dia:</h2>
      <p>{newsTitle ? newsTitle : 'Carregando...'}</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Digite um item"
      />
      <button onClick={handleAddToList}>Adicionar</button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default InputList;