package de.fritz.plugin;

import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;

public class FritzPlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        getLogger().info("FritzPlugin wurde aktiviert!");
        Bukkit.getPluginManager().registerEvents(new JoinListener(), this);
    }

    @Override
    public void onDisable() {
        getLogger().info("FritzPlugin wurde deaktiviert!");
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (!command.getName().equalsIgnoreCase("fritz")) {
            return false;
        }

        if (args.length == 0) {
            sender.sendMessage("§6FritzPlugin §7- verfügbare Befehle: §e/fritz hello §7| §e/fritz heal");
            return true;
        }

        if (args[0].equalsIgnoreCase("hello")) {
            sender.sendMessage("§aHallo von deinem Paper 1.21.x Plugin!");
            return true;
        }

        if (args[0].equalsIgnoreCase("heal")) {
            if (!(sender instanceof Player player)) {
                sender.sendMessage("§cDieser Befehl ist nur für Spieler.");
                return true;
            }

            player.setHealth(player.getMaxHealth());
            player.setFoodLevel(20);
            player.setSaturation(20f);
            player.sendMessage("§aDu wurdest vollständig geheilt.");
            return true;
        }

        sender.sendMessage("§cUnbekannter Unterbefehl. Nutze §e/fritz");
        return true;
    }
}
