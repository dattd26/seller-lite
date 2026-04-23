namespace SellerLite.Domain.Entities.ValueObjects;
public class PhoneNumber
{
    public string Value { get; private set; } = string.Empty;

    public PhoneNumber() { }

    public void SetValue(string phoneNumber)
    {
        if (string.IsNullOrWhiteSpace(phoneNumber))
            throw new ArgumentNullException(nameof(phoneNumber));
        if (phoneNumber.Length != 10 || !phoneNumber.All(char.IsDigit))
            throw new FormatException("Số điện thoại phải gồm 10 chữ số");
        Value = phoneNumber;
    }
}