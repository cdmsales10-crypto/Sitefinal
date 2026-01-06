// import { useCart } from "../lib/CartContext";
// import { Trash2 } from "lucide-react";

// export default function CartPage() {
//   const {
//     items,
//     updateQuantity,
//     removeFromCart,
//     totalPrice,
//     totalItems,
//     clearCart,
//   } = useCart();

//   const handleCheckoutWhatsApp = () => {
//     if (items.length === 0) return;

//     const lines: string[] = [];

//     lines.push("New order from website:");
//     lines.push(""); // blank line

//     items.forEach((item, index) => {
//       const subtotal = item.quantity * item.price;
//       lines.push(
//         `${index + 1}. ${item.name} - Qty: ${
//           item.quantity
//         } x ₹${item.price.toFixed(2)} = ₹${subtotal.toFixed(2)}`
//       );
//     });

//     lines.push("");
//     lines.push(`Total items: ${totalItems}`);
//     lines.push(`Total price: ₹${totalPrice.toFixed(2)}`);

//     const message = lines.join("\n"); // WhatsApp supports \n for new lines [web:2][web:9]
//     const encoded = encodeURIComponent(message); // safe for query param [web:14][web:10]

//     const phone = "919000805105"; // without + or leading 0 [web:1]
//     const url = `https://wa.me/${phone}?text=${encoded}`;

//     window.open(url, "_blank");
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16">
//       <h1 className="text-4xl md:text-5xl font-anton text-red-600 mb-8">
//         Your Cart
//       </h1>

//       {items.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-600 text-lg font-poppins">
//             Your cart is empty.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//           <div className="lg:col-span-2 space-y-6">
//             {items.map((item) => {
//               const subtotal = item.quantity * item.price;
//               const mrpTotal = (item.mrp ?? item.price) * item.quantity;
//               return (
//                 <div
//                   key={item.productId}
//                   className="flex items-start bg-white border rounded-lg p-6 shadow-sm"
//                 >
//                   <div className="w-28 h-28 bg-gray-100 rounded-md flex items-center justify-center mr-6 text-2xl">
//                     📦
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h3 className="font-semibold text-gray-800 text-lg md:text-xl">
//                           {item.name}
//                         </h3>
//                         <p className="text-sm text-gray-600 mt-1">
//                           Price: ₹{item.price}
//                         </p>
//                       </div>
//                       <div className="ml-4 flex flex-col items-end">
//                         <button
//                           onClick={() => removeFromCart(item.productId)}
//                           className="text-red-500 p-2 rounded hover:bg-gray-100"
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </div>

//                     <div className="mt-4 flex items-center space-x-3">
//                       <button
//                         onClick={() =>
//                           updateQuantity(
//                             item.productId,
//                             Math.max(1, item.quantity - 1)
//                           )
//                         }
//                         className="px-3 py-1 bg-gray-100 rounded text-lg"
//                       >
//                         -
//                       </button>
//                       <div className="px-4 py-2 border rounded text-lg">
//                         {item.quantity}
//                       </div>
//                       <button
//                         onClick={() =>
//                           updateQuantity(item.productId, item.quantity + 1)
//                         }
//                         className="px-3 py-1 bg-gray-100 rounded text-lg"
//                       >
//                         +
//                       </button>
//                       <div className="ml-6 text-gray-700 font-semibold">
//                         Subtotal: ₹{subtotal.toFixed(2)}
//                       </div>
//                     </div>

//                     {item.mrp && item.mrp > item.price ? (
//                       <div className="mt-2 text-sm text-gray-500">
//                         <span className="mr-2">M.R.P.</span>
//                         <span className="line-through text-gray-400">
//                           ₹{mrpTotal.toFixed(2)}
//                         </span>
//                       </div>
//                     ) : null}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <aside className="bg-white border rounded-lg p-6 shadow-sm lg:sticky lg:top-24">
//             <h4 className="font-semibold text-lg mb-4">Order Summary</h4>
//             <div className="flex justify-between text-gray-700 mb-3">
//               <span>Items ({totalItems})</span>
//               <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
//             </div>
//             <div className="mt-4">
//               <button
//                 onClick={handleCheckoutWhatsApp}
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded font-semibold"
//               >
//                 Checkout via WhatsApp
//               </button>
//             </div>
//             <div className="mt-3">
//               <button
//                 onClick={clearCart}
//                 className="w-full bg-gray-100 hover:bg-gray-200 text-black py-3 rounded font-semibold"
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </aside>
//         </div>
//       )}
//     </div>
//   );
// }
import { useCart } from "../lib/CartContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
    clearCart,
  } = useCart();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    if (!showForm || !formData.name || !formData.phone || !formData.address || !formData.pincode) {
      setShowForm(true);
      return;
    }

    const lines: string[] = [];

    lines.push("🛒 *NEW WEBSITE ORDER*");
    lines.push("════════════════════");
    lines.push("");

    lines.push(`👤 *Customer Details:*`);
    lines.push(`Name: ${formData.name}`);
    lines.push(`Phone: ${formData.phone}`);
    lines.push(`Address: ${formData.address}`);
    lines.push(`Pincode: ${formData.pincode}`);
    lines.push("");

    lines.push(`📦 *Order Items (${totalItems}):*`);
    items.forEach((item, index) => {
      const subtotal = item.quantity * item.price;
      lines.push(
        `${index + 1}. *${item.name}* - Qty: ${item.quantity} x ₹${item.price.toFixed(2)} = ₹${subtotal.toFixed(2)}`
      );
    });

    lines.push("");
    lines.push(`💰 *Total: ₹${totalPrice.toFixed(2)}*`);
    lines.push("════════════════════");
    lines.push("Please confirm order & delivery details!");

    const message = lines.join("\n");
    const encoded = encodeURIComponent(message);

    const phone = "919000805105";
    const url = `https://wa.me/${phone}?text=${encoded}`;

    window.open(url, "_blank");
    setShowForm(false); // Optional: hide form after sending
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <h1 className="text-4xl md:text-5xl font-anton text-red-600 mb-8">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg font-poppins">
            Your cart is empty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => {
              const subtotal = item.quantity * item.price;
              const mrpTotal = (item.mrp ?? item.price) * item.quantity;
              return (
                <div
                  key={item.productId}
                  className="flex items-start bg-white border rounded-lg p-6 shadow-sm"
                >
                  <div className="w-28 h-28 bg-gray-100 rounded-md flex items-center justify-center mr-6 text-2xl">
                    📦
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg md:text-xl">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Price: ₹{item.price}
                        </p>
                      </div>
                      <div className="ml-4 flex flex-col items-end">
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-500 p-2 rounded hover:bg-gray-100"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center space-x-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-3 py-1 bg-gray-100 rounded text-lg"
                      >
                        -
                      </button>
                      <div className="px-4 py-2 border rounded text-lg">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-100 rounded text-lg"
                      >
                        +
                      </button>
                      <div className="ml-6 text-gray-700 font-semibold">
                        Subtotal: ₹{subtotal.toFixed(2)}
                      </div>
                    </div>

                    {item.mrp && item.mrp > item.price ? (
                      <div className="mt-2 text-sm text-gray-500">
                        <span className="mr-2">M.R.P.</span>
                        <span className="line-through text-gray-400">
                          ₹{mrpTotal.toFixed(2)}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="bg-white border rounded-lg p-6 shadow-sm lg:sticky lg:top-24">
            <h4 className="font-semibold text-lg mb-4">Order Summary</h4>
            <div className="flex justify-between text-gray-700 mb-3">
              <span>Items ({totalItems})</span>
              <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
            </div>

            {showForm ? (
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="e.g. 9876543210"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                  <textarea
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-vertical"
                    placeholder="Enter complete delivery address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="e.g. 530001"
                    maxLength={6}
                    required
                  />
                </div>
              </div>
            ) : null}

            <div className="mt-4">
              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded font-semibold transition-colors"
                disabled={showForm && (!formData.name || !formData.phone || !formData.address || !formData.pincode)}
              >
                {showForm ? "Send Order to WhatsApp" : "Checkout via WhatsApp"}
              </button>
            </div>
            <div className="mt-3">
              <button
                onClick={clearCart}
                className="w-full bg-gray-100 hover:bg-gray-200 text-black py-3 rounded font-semibold transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
