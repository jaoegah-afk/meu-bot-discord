const { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  EmbedBuilder 
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let filaNormal = [];
let filaInfinito = [];

client.once('ready', () => {
  console.log(`Bot online como ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.content === "!painel") {

    const embed = new EmbedBuilder()
      .setTitle("🔥 1x1 Mobile - Sua Org")
      .setDescription("Escolha o modo abaixo para entrar na fila.")
      .setColor("Red");

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("gel_normal")
        .setLabel("🧊 Gel Normal")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("gel_infinito")
        .setLabel("🧊 Gel Infinito")
        .setStyle(ButtonStyle.Success)
    );

    message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "gel_normal") {
    if (filaNormal.includes(interaction.user.id))
      return interaction.reply({ content: "Você já está na fila!", ephemeral: true });

    filaNormal.push(interaction.user.id);

    if (filaNormal.length >= 2) {
      const p1 = filaNormal.shift();
      const p2 = filaNormal.shift();
      interaction.channel.send(`🔥 Partida formada!\n<@${p1}> 🆚 <@${p2}>\nModo: Gel Normal`);
    }

    await interaction.reply({ content: "Você entrou na fila Gel Normal!", ephemeral: true });
  }

  if (interaction.customId === "gel_infinito") {
    if (filaInfinito.includes(interaction.user.id))
      return interaction.reply({ content: "Você já está na fila!", ephemeral: true });

    filaInfinito.push(interaction.user.id);

    if (filaInfinito.length >= 2) {
      const p1 = filaInfinito.shift();
      const p2 = filaInfinito.shift();
      interaction.channel.send(`🔥 Partida formada!\n<@${p1}> 🆚 <@${p2}>\nModo: Gel Infinito`);
    }

    await interaction.reply({ content: "Você entrou na fila Gel Infinito!", ephemeral: true });
  }
});

client.login(process.env.TOKEN);
