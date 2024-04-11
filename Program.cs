using System.Security.Cryptography;

Console.Write("Digite o seu nome: ");
string name = Console.ReadLine();
Console.WriteLine($"Olá {name} ");
Console.Write("Em que ano você nasceu: ");
int year = int.Parse(Console.ReadLine());
int age = (2024 - year);

if (age >= 18)
{
Console.WriteLine("Você é maior de idade");
}

else
{
 Console.WriteLine("Você é menor de idade");   
}
