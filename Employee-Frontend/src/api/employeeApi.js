export const updateEmployee = async (id, updatedData, token) => {

    const response = await fetch(`http://localhost:8088/employees/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(updatedData)
    });

    return response;
};

// ❌ DELETE EMPLOYEE API
export const deleteEmployee = async (id, token) => {

    const response = await fetch(`http://localhost:8088/employees/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return response;
};