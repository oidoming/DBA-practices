using System;
using System.Diagnostics;

namespace Backup_mysql
{
    class Program
    {
        private static string password { get; set; } = Environment.GetEnvironmentVariable("mysqlvar", EnvironmentVariableTarget.User);
        static void Main(string[] args)
        {
            while (true)
            {
                Console.Clear();
                Console.WriteLine("1. Backup\n2. Restaurar");
                string option = Console.ReadLine();

                if (option == "1")
                {
                    Console.Clear();
                    Console.WriteLine("1. Backup todas las bases de datos\n2. Backup una base de datos");
                    option = Console.ReadLine();

                    if (option == "1")
                    {
                        ExportAllDatabases();
                        Console.WriteLine("Backup creado");
                        Console.ReadKey();
                    }
                    else if (option == "2")
                    {
                        Console.Clear();
                        Console.Write("Inrese el nombre de la base de datos: ");
                        string dbname = Console.ReadLine();

                        Console.WriteLine("");
                        Console.WriteLine("-- 1. Backup de toda la base de datos\n-- 2. Backup alguna tabla");
                        option = Console.ReadLine();

                        if (option == "1")
                        {
                            ExportDatabase(dbname);
                            Console.WriteLine("Backup creado");
                            Console.ReadKey();
                        }
                        else if (option == "2")
                        {
                            Console.Write("Inrese el nombre de la tabla: ");
                            string tablename = Console.ReadLine();

                            ExportTable(dbname, tablename);
                            Console.WriteLine("Backup creado");
                            Console.ReadKey();
                        }
                    }
                }
                else if (option == "2")
                {
                    Console.Clear();
                    Console.WriteLine("1. Restaurar todas las bases de datos\n2. Restaurar una base de datos");
                    option = Console.ReadLine();

                    if (option == "1")
                    {
                        ImportAllDatabases();
                        Console.WriteLine("Reastaurado");
                        Console.ReadKey();
                    }
                    else if (option == "2")
                    {
                        Console.Clear();
                        Console.Write("Inrese el nombre de la base de datos: ");
                        string dbname = Console.ReadLine();

                        Console.WriteLine("");
                        Console.WriteLine("-- 1. Restaurar toda la base de datos\n-- 2. Restaurar alguna tabla");
                        option = Console.ReadLine();

                        if (option == "1")
                        {
                            ImportDatabase(dbname);
                            Console.WriteLine("Reastaurado");
                            Console.ReadKey();
                        }
                        else if (option == "2")
                        {
                            Console.Write("Inrese el nombre de la tabla: ");
                            string tablename = Console.ReadLine();

                            ImportTable(dbname, tablename);
                            Console.WriteLine("Reastaurado");
                            Console.ReadKey();
                        }
                    }
                }
            }
        }

        public static void ExportAllDatabases()
        {
            Process process = new Process();
            process.StartInfo.FileName = "cmd.exe";
            process.StartInfo.CreateNoWindow = true;
            process.StartInfo.RedirectStandardInput = true;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.UseShellExecute = false;

            process.Start();

            process.StandardInput.WriteLine($"mysqldump --user=root --password={password} --all_databases > C:\\Users\\Oscar\\dev\\dba\\practica7\\databases_dump.sql");
            process.StandardInput.Flush();
            process.StandardInput.Close();
            process.WaitForExit();
        }

        public static void ImportAllDatabases()
        {
            Process process = new Process();
            process.StartInfo.FileName = "cmd.exe";
            process.StartInfo.CreateNoWindow = true;
            process.StartInfo.RedirectStandardInput = true;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.UseShellExecute = false;

            process.Start();

            process.StandardInput.WriteLine($"mysql --user=root --password={password} < C:\\Users\\Oscar\\dev\\dba\\practica7\\databases_dump.sql");
            process.StandardInput.Flush();
            process.StandardInput.Close();
            process.WaitForExit();
        }

        public static void ExportDatabase(string dbname)
        {
            Process process = new Process();
            process.StartInfo.FileName = "cmd.exe";
            process.StartInfo.CreateNoWindow = true;
            process.StartInfo.RedirectStandardInput = true;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.UseShellExecute = false;

            process.Start();

            process.StandardInput.WriteLine($"mysqldump --user=root --password={password} --databases {dbname} > C:\\Users\\Oscar\\dev\\dba\\practica7\\{dbname}_dump.sql");
            process.StandardInput.Flush();
            process.StandardInput.Close();
            process.WaitForExit();
        }

        public static void ImportDatabase(string dbname)
        {
            Process process = new Process();
            process.StartInfo.FileName = "cmd.exe";
            process.StartInfo.CreateNoWindow = true;
            process.StartInfo.RedirectStandardInput = true;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.UseShellExecute = false;

            process.Start();

            process.StandardInput.WriteLine($"mysql --user=root --password={password} < C:\\Users\\Oscar\\dev\\dba\\practica7\\{dbname}_dump.sql");
            process.StandardInput.Flush();
            process.StandardInput.Close();
            process.WaitForExit();
        }

        public static void ExportTable(string dbname, string tablename)
        {
            Process process = new Process();
            process.StartInfo.FileName = "cmd.exe";
            process.StartInfo.CreateNoWindow = true;
            process.StartInfo.RedirectStandardInput = true;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.UseShellExecute = false;

            process.Start();

            process.StandardInput.WriteLine($"mysqldump --user=root --password={password} {dbname} {tablename} > C:\\Users\\Oscar\\dev\\dba\\practica7\\{dbname}_{tablename}_dump.sql");
            process.StandardInput.Flush();
            process.StandardInput.Close();
            process.WaitForExit();
        }

        public static void ImportTable(string dbname, string tablename)
        {
            Process process = new Process();
            process.StartInfo.FileName = "cmd.exe";
            process.StartInfo.CreateNoWindow = true;
            process.StartInfo.RedirectStandardInput = true;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.UseShellExecute = false;

            process.Start();

            process.StandardInput.WriteLine($"mysql --user=root --password={password} {dbname} < C:\\Users\\Oscar\\dev\\dba\\practica7\\{dbname}_{tablename}_dump.sql");
            process.StandardInput.Flush();
            process.StandardInput.Close();
            process.WaitForExit();
        }
    }
}
