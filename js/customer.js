const customerFields = [

    "customer-name",
    "customer-phone",
    "customer-province",
    "customer-city",
    "customer-address"

];

function saveCustomerData() {

    const customerData = {

        name:
            document.getElementById(
                "customer-name"
            )?.value || "",

        phone:
            document.getElementById(
                "customer-phone"
            )?.value || "",

        province:
            document.getElementById(
                "customer-province"
            )?.value || "",

        city:
            document.getElementById(
                "customer-city"
            )?.value || "",

        address:
            document.getElementById(
                "customer-address"
            )?.value || ""

    };

    localStorage.setItem(
        "miora_customer",
        JSON.stringify(customerData)
    );

}

function loadCustomerData() {

    const savedData =
        JSON.parse(
            localStorage.getItem(
                "miora_customer"
            )
        ) || {};

    document.getElementById(
        "customer-name"
    ).value =
        savedData.name || "";

    document.getElementById(
        "customer-phone"
    ).value =
        savedData.phone || "";

    document.getElementById(
        "customer-province"
    ).value =
        savedData.province || "";

    document.getElementById(
        "customer-city"
    ).value =
        savedData.city || "";

    document.getElementById(
        "customer-address"
    ).value =
        savedData.address || "";

}

window.addEventListener(
    "load",
    () => {

        loadCustomerData();

        customerFields.forEach(
            fieldId => {

                document
                    .getElementById(
                        fieldId
                    )
                    ?.addEventListener(
                        "input",
                        saveCustomerData
                    );

            }
        );

    }
);