using System;
using System.Collections.Generic;
using System.Linq;

namespace hashing
{
    class Program
    {
        static void Main(string[] args)
        {
            char[] alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
            var abc = new Dictionary<char, int>();
            for (int i = 1; i <= alpha.Length; i++)
            {
                abc.Add(alpha[i - 1], i);

            }

            string[] memory = new string[250];
            /*
            add("ABC", memory, abc);
            for (int i = 0; i < memory.Length; i++)
            {
                Console.WriteLine(String.Format(" array[{0}] = {1}", i+1, memory[i]));
            }*/

            while (true)
            {
                Console.Write("valor a guardar: ");
                string val = Console.ReadLine();

                if (!val.Any(char.IsUpper))
                {
                    Console.WriteLine("Solo letras mayus");
                    continue;
                }

                add(val, memory, abc);
                for (int i = 0; i < memory.Length; i++)
                {
                    Console.WriteLine(String.Format(" Direccion[{0}] = {1}", i + 1, memory[i]));
                }
            }

            //Console.WriteLine("Hello World!");
        }

        public static void add(string str, string[] memory, Dictionary<char, int> abc)
        {
            int sum = 0;
            foreach (var c in str)
            {
                sum += abc[c];
            }

            if (memory[sum - 1] == null)
            {
                memory[sum - 1] = str;
            }
            else
            {
                for (int i = sum - 1; i < memory.Length; i++)
                {
                    if (i == 249 && memory[i] != null)
                    {
                        i = 0;
                    }

                    if (memory[i] == null)
                    {
                        memory[i] = str;
                        break;
                    }
                }
            }
        }
    }
}
