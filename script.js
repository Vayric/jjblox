/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    
    // Page Switcher
    window.showPage = (page) => {
        document.getElementById('page-home').classList.add('hidden');
        document.getElementById('page-checkout').classList.add('hidden');
        document.getElementById('page-' + page).classList.remove('hidden');
        window.scrollTo(0, 0);
    };

    // Checkout Logic
    window.goToCheckout = (name, price, icon) => {
        document.getElementById('checkout-item-name').innerText = name;
        document.getElementById('checkout-item-price').innerText = price;
        document.getElementById('checkout-icon').innerHTML = `<i class="fa-solid ${icon}"></i>`;
        showPage('checkout');
    };

    // Currency Switcher
    window.switchCurrency = (type) => {
        const usdBtn = document.getElementById('btn-usd');
        const cryptoBtn = document.getElementById('btn-crypto');
        
        if(type === 'CRYPTO') {
            cryptoBtn.className = "px-6 py-2 rounded-full bg-blue-600 text-white text-xs font-bold";
            usdBtn.className = "px-6 py-2 rounded-full bg-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-700";
            alert("Switching to Crypto Gateway...");
        } else {
            usdBtn.className = "px-6 py-2 rounded-full bg-blue-600 text-white text-xs font-bold";
            cryptoBtn.className = "px-6 py-2 rounded-full bg-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-700";
        }
    };

    // Modal Logic
    const authModal = document.getElementById('authModal');
    window.toggleModal = (mode) => {
        if (!mode) { authModal.classList.add('hidden'); return; }
        authModal.classList.remove('hidden');
        authModal.classList.add('flex');
        
        const inner = document.getElementById('modal-inner');
        if (mode === 'login') {
            inner.innerHTML = `
                <h2 class="text-2xl font-bold text-white mb-6">Login</h2>
                <input type="text" placeholder="Username" class="auth-input">
                <input type="password" placeholder="Password" class="auth-input">
                <button onclick="alert('Logged in!')" class="w-full py-4 bg-blue-600 rounded-xl font-bold">Continue</button>
            `;
        } else {
            inner.innerHTML = `
                <h2 class="text-2xl font-bold text-white mb-6">Create Account</h2>
                <input type="text" placeholder="Username" class="auth-input">
                <input type="email" placeholder="Email" class="auth-input">
                <input type="password" placeholder="Password" class="auth-input">
                <button onclick="handleSignup()" class="w-full py-4 bg-blue-600 rounded-xl font-bold">Register</button>
            `;
        }
    };

    window.handleSignup = () => {
        alert("Account Registered in JJBLOX Database!");
        toggleModal();
    };

    // Particles (Keep original particle code here from previous response)
});
