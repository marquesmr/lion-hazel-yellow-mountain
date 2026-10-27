package legis.auxilia;

import android.app.Activity;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.text.InputType;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

public class MainActivity extends Activity {
    private static final String PREFS = "auxilia";
    private static final String URL = "url";
    private WebView web;
    private long pausadoEm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String endereco = prefs().getString(URL, "");
        if (endereco == null || endereco.isEmpty()) mostrarEndereco(false);
        else abrir(endereco);
    }

    private SharedPreferences prefs() {
        return getSharedPreferences(PREFS, MODE_PRIVATE);
    }

    private void mostrarEndereco(boolean podeCancelar) {
        LinearLayout caixa = new LinearLayout(this);
        caixa.setOrientation(LinearLayout.VERTICAL);
        caixa.setPadding(48, 48, 48, 32);
        caixa.setBackgroundColor(Color.parseColor("#f3efe6"));
        TextView titulo = new TextView(this);
        titulo.setText("Auxilia Legis");
        titulo.setTextSize(28);
        titulo.setTextColor(Color.parseColor("#1b1915"));
        TextView ajuda = new TextView(this);
        ajuda.setText("Informe o endereço do sistema. O aplicativo abre esse site e passa a mostrar as atualizações feitas no navegador, sem precisar de outro APK.");
        ajuda.setTextColor(Color.parseColor("#6d665c"));
        ajuda.setPadding(0, 16, 0, 24);
        EditText campo = new EditText(this);
        campo.setHint("https://seu-dominio");
        campo.setInputType(InputType.TYPE_TEXT_VARIATION_URI);
        campo.setSingleLine(true);
        String atual = prefs().getString(URL, "");
        if (atual != null) campo.setText(atual);
        Button entrar = new Button(this);
        entrar.setText("Abrir");
        entrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String normal = normalizar(campo.getText().toString());
                if (normal == null) {
                    campo.setError("Endereço inválido");
                    return;
                }
                prefs().edit().putString(URL, normal).apply();
                abrir(normal);
            }
        });
        caixa.addView(titulo);
        caixa.addView(ajuda);
        caixa.addView(campo);
        caixa.addView(entrar);
        if (podeCancelar && web != null) {
            Button voltar = new Button(this);
            voltar.setText("Voltar");
            voltar.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    setContentView(web);
                }
            });
            caixa.addView(voltar);
        }
        setContentView(caixa);
    }

    private String normalizar(String bruto) {
        String texto = bruto == null ? "" : bruto.trim();
        if (texto.isEmpty()) return null;
        if (!texto.startsWith("http://") && !texto.startsWith("https://")) texto = "https://" + texto;
        Uri uri = Uri.parse(texto);
        if (uri.getHost() == null || uri.getHost().isEmpty()) return null;
        return texto;
    }

    private void abrir(String endereco) {
        if (web == null) {
            web = new WebView(this);
            WebSettings conf = web.getSettings();
            conf.setJavaScriptEnabled(true);
            conf.setDomStorageEnabled(true);
            conf.setDatabaseEnabled(true);
            conf.setCacheMode(WebSettings.LOAD_NO_CACHE);
            conf.setUseWideViewPort(true);
            conf.setLoadWithOverviewMode(true);
            web.setWebViewClient(new WebViewClient() {
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                    return false;
                }
            });
            web.setWebChromeClient(new WebChromeClient());
        }
        setContentView(web);
        web.loadUrl(endereco);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        menu.add(0, 1, 0, "Recarregar");
        menu.add(0, 2, 1, "Trocar endereço");
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == 1 && web != null) {
            web.reload();
            return true;
        }
        if (item.getItemId() == 2) {
            mostrarEndereco(web != null);
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onBackPressed() {
        if (web != null && web.canGoBack() && getWindow().getDecorView().findViewById(android.R.id.content) != null) {
            View atual = ((android.view.ViewGroup) findViewById(android.R.id.content)).getChildAt(0);
            if (atual == web) {
                web.goBack();
                return;
            }
        }
        super.onBackPressed();
    }

    @Override
    protected void onPause() {
        pausadoEm = System.currentTimeMillis();
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (web != null && pausadoEm > 0 && System.currentTimeMillis() - pausadoEm > 5 * 60 * 1000L) {
            web.reload();
        }
    }
}
