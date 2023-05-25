<script setup lang='ts'>
// import { runDatabase } from '../../lib/mongodb'
// runDatabase()


</script>
<template>
    <section class="container panel">
        <h2>Add Product</h2>
        <div class="add-product">
            <form method="post">
                <input type="url" placeholder="Product url" required>
                <input type="url" placeholder="Affiliate url" required>
                <button type="submit">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z" />
                    </svg>
                </button>
            </form>
        </div>
    </section>

    <section class="container">
        <div class="table-holder">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Click</th>
                        <th>Views</th>
                        <th>Date</th>
                        <th>Detail</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>1</td>
                        <td>Nitesh</td>
                        <td>10</td>
                        <td>19</td>
                        <td>12 dec 2022</td>
                        <td>
                            <button>
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.267 4.209a.75.75 0 0 0-1.034 1.086l6.251 5.955H3.75a.75.75 0 0 0 0 1.5h14.734l-6.251 5.954a.75.75 0 0 0 1.034 1.087l7.42-7.067a.996.996 0 0 0 .3-.58.758.758 0 0 0-.001-.29.995.995 0 0 0-.3-.578l-7.419-7.067Z" />
                                </svg>
                            </button>
                        </td>

                        <td>
                            <button class="delete">
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


    </section>
</template>
<style scoped>
.light {
    overflow: auto;
    margin-top: 2rem;
    background-color: var(--color-surface-variant);
}

.panel {
    overflow: auto;
    background-color: var(--color-surface-variant);
    color: var(--color-on-secondary);
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-radius: var(--radius-medium);
}

.panel h2 {
    text-align: center;
    color: inherit;
}

.add-product form {
    display: flex;
    gap: 1em;
    margin-bottom: 4em;
}

.add-product input {
    outline: none;
    border: none;
    background-color: var(--color-surface);
    border: 1px solid var(--color-surface-dark);
    border-radius: var(--radius-medium);
    flex: 1;
    font-size: var(--medium-font);
    padding: 0.6em 1em;
}

.add-product button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8em;
    border: none;
    outline: none;
    background-color: var(--color-primary);
    border-radius: var(--radius-medium);
}

.add-product button:hover {
    background-color: var(--color-primary-variant);
}

.add-product button svg {
    fill: var(--color-on-primary);
}




/* --------------------- table ----------------------- */

.table-holder {
    margin-top: 5rem;
    overflow-x: scroll;
}

table {
    border: none;
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    background-color: var(--color-surface-variant);
    border-radius: var(--radius-medium);
}

thead {
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    position: relative;
}

th {
    padding: 1em;
    font-weight: 600;
    color: var(--color-primary);
}

td {
    padding: 0.8em 1em;
    border-bottom: 1px solid var(--color-surface);
}

td button {
    border: none;
    background-color: transparent;
}

td svg {
    fill: var(--color-primary)
}

td .delete svg {
    fill: var(--color-error);
}

td button:hover {
    scale: 1.2;
}


tbody tr {
    background-color: var(--color-surface-variant);
    cursor: pointer;
}

tbody tr:hover {
    background-color: var(--color-surface);

}
</style>