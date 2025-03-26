document.addEventListener("DOMContentLoaded", function () {
    const tipoServico = document.getElementById("tipoServico");
    const marcaContainer = document.getElementById("marcaContainer");
    const marca = document.getElementById("marca");

    const precisaBuscar = document.getElementById("precisaBuscar");
    const enderecoContainer = document.getElementById("enderecoContainer");

    const sabeProblema = document.getElementById("sabeProblema");
    const problemaContainer = document.getElementById("problemaContainer");

    const form = document.getElementById("serviceForm");
    const btnEnviar = document.getElementById("btnEnviar");

    const marcasPorServico = {
        "Conserto de Betoneiras": ["Menegotti", "CSM", "Maqtron", "Horbach", "Possamai", "Fischer", "Metalpama", "Toyama"],
        "Conserto de máquinas elétricas": ["Bosch", "Makita", "Menegotti", "CSM"],
        "Conserto de máquinas a combustão": ["Menegotti", "CSM", "Webber", "Wolcan", "Toyama", "Branco", "Petrotec"]
    }

    tipoServico.addEventListener("change", function () {
        const servicoSelecionado = tipoServico.value;
        if (servicoSelecionado) {
            marca.innerHTML = '<option value="">Selecione...</option>';
            marcasPorServico[servicoSelecionado].forEach(m => {
                const option = document.createElement("option");
                option.value = m.toLowerCase();
                option.textContent = m;
                marca.appendChild(option);
            });
            marcaContainer.classList.remove("d-none");
        } else {
            marcaContainer.classList.add("d-none");
        }
    });

    precisaBuscar.addEventListener("change", function () {
        enderecoContainer.classList.toggle("d-none", !precisaBuscar.checked);
    });

    sabeProblema.addEventListener("change", function () {
        problemaContainer.classList.toggle("d-none", !sabeProblema.checked);
    });

    form.addEventListener("input", function () {
        const nomePreenchido = document.getElementById("nomeCliente").value.trim() !== "";
        const servicoSelecionado = tipoServico.value !== "";
        const marcaSelecionada = marca.value !== "";
        const enderecoOK = !precisaBuscar.checked || (
            document.getElementById("rua").value.trim() !== "" &&
            document.getElementById("bairro").value.trim() !== "" &&
            document.getElementById("numero").value.trim() !== "" &&
            document.getElementById("cidade").value.trim() !== ""
        );
        const problemaOK = !sabeProblema.checked || document.getElementById("descricaoProblema").value.trim() !== "";

        btnEnviar.disabled = !(nomePreenchido && servicoSelecionado && marcaSelecionada && enderecoOK && problemaOK);
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nomeCliente").value.trim();
        const servico = tipoServico.value;
        const marcaSelecionada = marca.value;
        const enderecoCompleto = precisaBuscar.checked
            ? `${document.getElementById("rua").value}, Nº ${document.getElementById("numero").value}, ${document.getElementById("bairro").value}, ${document.getElementById("cidade").value}`
            : "Levarei até a loja";
        const problemaDescricao = sabeProblema.checked
            ? document.getElementById("descricaoProblema").value.trim()
            : "Não sei identificar";

        const numeroWhatsApp = "5544997229355"; // Número do WhatsApp

        const mensagem = `Olá, meu nome é *${nome}*!\n\n` +
            `Gostaria de solicitar um orçamento para *${servico}*.\n\n` +
            ` - *Marca:* ${marcaSelecionada}\n` +
            ` - *Endereço:* ${enderecoCompleto}\n` +
            ` - *Problema:* ${problemaDescricao}\n\n` +
            `Fico no aguardo do retorno. Obrigado(a)!\n\n` +
            `Atenciosamente,\n${nome}`;

        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

        window.open(urlWhatsApp, "_blank");
    });

})