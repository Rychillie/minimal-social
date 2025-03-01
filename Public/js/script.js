const checkSection = document.querySelector("dialog.auth .steps .check");
const checkMessage = checkSection.querySelector('.check-message');
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')
const dialogAuth = document.querySelector("dialog.auth");
const showButton = document.querySelector("button.mono");
const useMagicLink = document.querySelector("button.signin-magic-link");
const steps = document.querySelector("dialog.auth .steps");
const emailBack = document.querySelector("dialog.auth .steps .email button.back");
const emailInput = document.querySelector('dialog.auth .steps .email input[type="email"]');
const emailSubmit = document.querySelector('dialog.auth .steps .email button.next');
const checkBack = document.querySelector("dialog.auth .steps .check button.back");
const checkNext = document.querySelector("dialog.auth .steps .check button.next");

steps.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function updateSubmitButton() {
    const isValid = validateEmail(emailInput.value);
    emailSubmit.disabled = !isValid;
    
    // Atualizar classes para feedback visual
    emailInput.classList.toggle('invalid', !isValid);
    emailSubmit.classList.toggle('valid', isValid);
}

showButton.addEventListener("click", () => {
    steps.style.transition = 'none';
    steps.style.transform = 'translateX(0%) translateZ(0px)';
    
    void steps.offsetWidth;
    
    steps.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    dialogAuth.showModal();
});

useMagicLink.addEventListener("click", (e) => {
    e.preventDefault();
    steps.style.transform = 'translateX(-33.33%) translateZ(0px)';
});

emailBack.addEventListener("click", (e) => {
    e.preventDefault();
    steps.style.transform = 'translateX(0%) translateZ(0px)';
});

emailInput.addEventListener('input', () => {
    updateSubmitButton();
    
    // Remover mensagem de erro enquanto digita
    emailInput.removeAttribute('data-error');
});

emailSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if (!validateEmail(emailInput.value)) {
        emailInput.setAttribute('data-error', 'true');
        return;
    }
    
    try {
        // Estado de loading
        emailSubmit.innerHTML = `
            <span class="loading">
                <span style="background-color: #000;"></span>
                <span style="background-color: #000;"></span>
                <span style="background-color: #000;"></span>
            </span>
        `;
        emailSubmit.disabled = true;

        // Chamada à API
        const response = await fetch('/auth/magic-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: emailInput.value })
        });

        // Verificar se o corpo da resposta é JSON válido
        let data;
        
        try {
            data = await response.json();
        } catch (e) {
            console.warn("⚠️ A resposta da API não é um JSON válido.");
            data = {}; // Garante que data sempre existe
        }

        console.log("🔍 Resposta da API:", response.status, data);

        if (!response.ok) {
            throw new Error(data.message || 'Failed to send magic link');
        }

        // Sucesso - atualizar check section
        checkMessage.innerHTML = `
            <h3>Check your email<span role="img" aria-label="mailbox">📭</span></h3>
            <p>We sent a magic link to <strong>${emailInput.value}</strong></p>
            <p class="hint">Click the link in the email to login.</p>
        `;

        steps.style.transform = 'translateX(-66.66%) translateZ(0px)';
        
    } catch (error) {
        console.error("❌ Erro ao enviar email:", error.message);
        emailInput.setAttribute('data-error', 'true');
        checkMessage.innerHTML = `
            <h3>Error sending email<span role="img" aria-label="error">❌</span></h3>
            <p>Failed to send magic link to <strong>${emailInput.value}</strong></p>
            <p class="hint">Please try again later.</p>
        `;
        steps.style.transform = 'translateX(-66.66%) translateZ(0px)';
    } finally {
        // Resetar estado
        emailSubmit.textContent = 'Submit';
        emailSubmit.disabled = false;
    }
});

checkBack.addEventListener("click", (e) => {
    e.preventDefault();
    steps.style.transform = 'translateX(-33.33%) translateZ(0px)';
});

// Close the dialog when the backdrop is clicked
dialogAuth.addEventListener('click', function(event) {
    var rect = dialogAuth.getBoundingClientRect();
    
    var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);

    if (!isInDialog) {
        dialogAuth.close();
    }
});

dialogAuth.addEventListener('close', () => {
    steps.style.transform = 'translateX(0%) translateZ(0px)';
    emailInput.value = '';
    emailSubmit.disabled = true;
});

// Retrieve the saved tab from local storage
const savedTab = localStorage.getItem('activeTab');
if (savedTab) {
    // Clear all active states before setting the saved tab
    tabContents.forEach(tabContent => {
        tabContent.classList.remove('active');
    });
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const target = document.querySelector(savedTab);
    if (target) {
        target.classList.add('active');
        document.querySelector(`[data-tab-target="${savedTab}"]`).classList.add('active');
    }
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active');
        });

        tabs.forEach(tab => { tab.classList.remove('active'); });
        tab.classList.add('active');
        target.classList.add('active');

        // Save the selected tab to local storage
        localStorage.setItem('activeTab', tab.dataset.tabTarget);
    });
});
