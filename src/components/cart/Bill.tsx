const bill = () => {
  return (
    <div className="bg-[#F2F3F7] rounded-lg p-6 mt-10 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-dark/60 font-normal">Subtotal</h4>
        <p className="text-dark font-medium">$93.45</p>
      </div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-dark/60 font-normal">Discount sales</h4>
        <p className="text-dark font-medium">-$5.00</p>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-dark/60 font-normal">Total sales tax</h4>
        <p className="text-dark font-medium">-$5.00</p>
      </div>
      <div className="border-dashed-with-spacing relative mb-6 mt-7">
        <div className="absolute -bottom-3 -left-9 w-7 h-7 rounded-full bg-white"></div>
        <div className="absolute -bottom-3 -right-9 w-7 h-7 rounded-full bg-white"></div>
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-dark text-xl font-medium">Total</h4>
        <p className="text-dark text-xl font-medium">$93.24</p>
      </div>
    </div>
  );
};

export default bill;
