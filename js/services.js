document.addEventListener("DOMContentLoaded", function () {
    const tipoServico = document.getElementById("tipoServico");
    const marcaContainer = document.getElementById("marcaContainer");
    const marca = document.getElementById("marca");

    const precisaBuscar = document.getElementById("precisaBuscar");
    const enderecoContainer = document.getElementById("enderecoContainer");

    const sabeProblema = document.getElementById("sabeProblema");
    const problemaContainer = document.getElementById("problemaContainer");
    const maquinaContainer = document.getElementById("maquinaContainer");
    const maquinaInput = document.getElementById("maquina");
    const outraMarcaContainer = document.getElementById("outraMarcaContainer");
    const outraMarcaInput = document.getElementById("outraMarca");

    const form = document.getElementById("serviceForm");
    const btnEnviar = document.getElementById("btnEnviar");

    const marcasPorServico = {
        "Conserto de Betoneiras": ["Menegotti", "CSM", "Maqtron", "Horbach", "Possamai", "Fischer", "Metalpama", "Toyama", "Outra..."],
        "Conserto de máquinas elétricas": ["Bosch", "Makita", "Menegotti", "CSM", "Outra..."],
        "Conserto de máquinas a combustão": ["Menegotti", "CSM", "Webber", "Wolcan", "Toyama", "Branco", "Petrotec", "Outra..."]
    };

    tipoServico.addEventListener("change", function () {
        const servicoSelecionado = tipoServico.value;
        
        outraMarcaContainer.classList.add("d-none");
        outraMarcaInput.required = false;
        outraMarcaInput.value = "";

        if (servicoSelecionado === "Conserto de máquinas elétricas" || servicoSelecionado === "Conserto de máquinas a combustão") {
            maquinaContainer.classList.remove("d-none");
        } else {
            maquinaContainer.classList.add("d-none");
            maquinaInput.value = "";
        }

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

    marca.addEventListener("change", function () {
        if (marca.value === "outra...") {
            outraMarcaContainer.classList.remove("d-none");
            outraMarcaInput.required = true;
        } else {
            outraMarcaContainer.classList.add("d-none");
            outraMarcaInput.required = false;
            outraMarcaInput.value = "";
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
        const maquinaOK = maquinaContainer.classList.contains("d-none") || maquinaInput.value.trim() !== "";

        btnEnviar.disabled = !(nomePreenchido && servicoSelecionado && marcaSelecionada && enderecoOK && problemaOK && maquinaOK);
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nomeCliente").value.trim();
        const servico = tipoServico.value;
        const marcaSelecionada = marca.value === "outra..." ? outraMarcaInput.value.trim() : marca.value;
        const maquinaSelecionada = maquinaContainer.classList.contains("d-none") ? '' : ` - *Máquina:* ${maquinaInput.value.trim()}\n`;
        const enderecoCompleto = precisaBuscar.checked
            ? `${document.getElementById("rua").value}, Nº ${document.getElementById("numero").value}, ${document.getElementById("bairro").value}, ${document.getElementById("cidade").value}`
            : "Levarei até a loja";
        const problemaDescricao = sabeProblema.checked
            ? document.getElementById("descricaoProblema").value.trim()
            : "Não sei identificar";

        const numeroWhatsApp = "5544997687380"; // Número do WhatsApp

        const mensagem = `Olá, meu nome é *${nome}*!\n\n` +
            `Gostaria de solicitar um orçamento para *${servico}*.\n\n` +
            ` - *Marca:* ${marcaSelecionada}\n` +
            `${maquinaSelecionada}` +
            ` - *Endereço:* ${enderecoCompleto}\n` +
            ` - *Problema:* ${problemaDescricao}\n\n` +
            `Fico no aguardo do retorno. Obrigado(a)!\n\n` +
            `Atenciosamente,\n${nome}`;

        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

        window.open(urlWhatsApp, "_blank");
    });

});
