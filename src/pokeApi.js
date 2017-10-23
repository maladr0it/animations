const pokeApi = {
  async getSprite(id) {
    try {
      const resp = await fetch(
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+id+'.png'
      );
      if (!resp.ok) {
        throw new Error('sprite_not_found');
      }
      return resp.blob();
    }
    catch(e) {
      console.log(e.message);
      return new Blob();
    }
  }
};

export default pokeApi;