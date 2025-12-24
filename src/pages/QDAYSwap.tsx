const QDAYSwap = () => {
  return (
    <div className="w-full h-full -m-4 lg:-m-6">
      <iframe
        src="https://swap.qday.io/en"
        className="w-full h-[calc(100vh-120px)] lg:h-[calc(100vh-80px)] border-0"
        title="QDAY Swap"
        allow="clipboard-read; clipboard-write; fullscreen"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        loading="lazy"
      />
    </div>
  );
};

export default QDAYSwap;
