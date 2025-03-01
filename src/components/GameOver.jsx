const GameOver = ({ onReturnToMenu }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="max-w-lg w-full bg-black border border-gray-800 rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-5xl font-serif text-red-800 mb-6 tracking-wider opacity-90">
          Kematian
        </h1>
        
        <p className="text-gray-500 mb-12 italic font-light">
          Kegelapan telah merenggutmu...
        </p>
        
        <button
          onClick={onReturnToMenu}
          className="px-6 py-3 bg-black hover:bg-gray-900 text-gray-400 font-medium rounded border border-gray-800 transition-colors duration-500"
        >
          Kembali ke Menu Utama
        </button>
      </div>
    </div>
  );
};

export default GameOver;